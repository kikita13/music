import { Collection, GuildMember, VoiceBasedChannel } from "discord.js";
import { ALLOWED_IDS } from "../consts";

//Возвращает объект канала к которому подключен разрешенный id
export const channelOfMember = (members: Collection<string, GuildMember>): VoiceBasedChannel => members.find((user) =>  ALLOWED_IDS.find(id => user.user.id === id))?.voice.channel as VoiceBasedChannel;