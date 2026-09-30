package org.example.mcdashboard.util;

import java.io.*;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;

public class RconClient implements AutoCloseable {

    private static final int TYPE_AUTH = 3;
    private static final int TYPE_COMMAND = 2;

    private final Socket socket;
    private final InputStream in;
    private final OutputStream out;
    private int requestId = 0;

    public RconClient(String host, int port, String password) throws IOException {
        this.socket = new Socket(host, port);
        this.socket.setSoTimeout(5000);
        this.in = socket.getInputStream();
        this.out = socket.getOutputStream();
        authenticate(password);
    }

    private void authenticate(String password) throws IOException {
        int id = nextId();
        sendPacket(id, TYPE_AUTH, password);
        RconPacket response = readPacket();
        if (response.id == -1) {
            throw new IOException("RCON authentication failed");
        }
    }

    public String sendCommand(String command) throws IOException {
        int id = nextId();
        sendPacket(id, TYPE_COMMAND, command);
        RconPacket response = readPacket();
        return response.payload;
    }

    private void sendPacket(int id, int type, String payload) throws IOException {
        byte[] payloadBytes = payload.getBytes(StandardCharsets.UTF_8);
        int length = 4 + 4 + payloadBytes.length + 2;

        ByteBuffer buf = ByteBuffer.allocate(4 + length).order(ByteOrder.LITTLE_ENDIAN);
        buf.putInt(length);
        buf.putInt(id);
        buf.putInt(type);
        buf.put(payloadBytes);
        buf.put((byte) 0);
        buf.put((byte) 0);

        out.write(buf.array());
        out.flush();
    }

    private RconPacket readPacket() throws IOException {
        byte[] lengthBytes = in.readNBytes(4);
        int length = ByteBuffer.wrap(lengthBytes).order(ByteOrder.LITTLE_ENDIAN).getInt();

        byte[] data = in.readNBytes(length);
        ByteBuffer buf = ByteBuffer.wrap(data).order(ByteOrder.LITTLE_ENDIAN);

        int id = buf.getInt();
        int type = buf.getInt();

        int payloadLength = length - 4 - 4 - 2;
        byte[] payloadBytes = new byte[Math.max(payloadLength, 0)];
        buf.get(payloadBytes);

        return new RconPacket(id, type, new String(payloadBytes, StandardCharsets.UTF_8));
    }

    @Override
    public void close() throws IOException {
        socket.close();
    }

    private int nextId() {
        return ++requestId;
    }

    private record RconPacket(int id, int type, String payload) {}
}
