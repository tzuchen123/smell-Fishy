<template>
    <div id="app">
      <h1>房間聊天</h1>
      <input v-model="roomName" placeholder="輸入房間名稱" />
      <button @click="joinRoom">加入房間</button>
      <button @click="leaveRoom">離開房間</button>
  
      <div v-if="joined">
        <input v-model="message" placeholder="輸入訊息" />
        <button @click="sendMessage">發送</button>
        
        <ul>
          <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        roomName: '',
        message: '',
        messages: [],
        joined: false,
      };
    },
    methods: {
      joinRoom() {
        if (this.roomName) {
          this.$socket.emit('join-room', this.roomName);
          this.joined = true;
        }
      },
      leaveRoom() {
        if (this.roomName) {
          this.$socket.emit('leave-room', this.roomName);
          this.joined = false;
          this.messages = [];
        }
      },
      sendMessage() {
        if (this.message) {
          this.$socket.emit('send-message', { roomName: this.roomName, message: this.message });
          this.message = '';
        }
      },
    },
    mounted() {
      // 監聽房間內的消息
      this.$socket.on('receive-message', ({ user, message }) => {
        this.messages.push(`${user}: ${message}`);
      });
  
      // 監聽用戶加入
      this.$socket.on('user-joined', (msg) => {
        this.messages.push(msg);
      });
  
      // 監聽用戶離開
      this.$socket.on('user-left', (msg) => {
        this.messages.push(msg);
      });
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
  }
  </style>
  