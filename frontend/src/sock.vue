<template>
  <div id="app">
    <h1>Socket.io Vue Example</h1>
    <input v-model="message" placeholder="Type a message" />
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      message: '',
      messages: []
    };
  },
  mounted() {
    // 連接到 Socket.io 服務器
    this.socket = io('http://localhost:3000');
    
    // 接收從服務器發來的消息
    this.socket.on('message', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        // 發送消息到服務器
        this.socket.emit('message', this.message);
        this.message = '';
      }
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

input {
  margin-right: 10px;
}
</style>
