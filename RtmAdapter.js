import RtmEngine from 'agora-react-native-rtm'
import {EventEmitter} from 'events'
import {APP_ID, Logger} from './utils'

export default class RtmAdapter extends EventEmitter {
  constructor() {
    super()
    this.uid = Math.floor(Math.random() * 100);
    this.client = new RtmEngine()
    const events = [
      "error",
      "messageReceived",
      "channelMessageReceived",
      "channelMemberJoined",
      "channelMemberLeft",
      "tokenExpired",
      "connectionStateChanged",
    ]

    events.forEach((event) => {
      this.client.on(event, (evt) => {
        this.emit(event, evt)
      });
    });
  }

  async func(fid) {
    await this.login(fid);
    
  }

  async login(uid){
    await this.client.createClient(APP_ID)
    this.uid = uid
    return this.client.login({
      uid: this.uid
    })
  }

  async logout(){
    await this.client.logout()
    Logger.log("logout success")
  }

  async join(cid){
    return this.client.joinChannel(cid)
  }

  async leave(cid){
    return this.client.leaveChannel(cid)
  }

  async sendChannelMessage(channel, message){
    return this.client.sendMessageByChannelId(channel, message)
  }

  async destroy(){
    await this.client.destroyClient()
    Logger.log("destroy")
  }
}