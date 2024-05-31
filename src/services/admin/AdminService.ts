import { API_URL } from "@/main";
import {
  BannedPlayer,
  BannedPlayersResponse,
  QueueData,
  Proxy,
  SearchedPlayer,
  ProxySettings,
  GloballyMutedPlayer,
  GlobalMute,
  PortraitDefinition,
  ChangePortraitsCommand,
  ChangePortraitsDto,
  PortraitDefinitionGroup,
  PortraitDefinitionDTO,
  ReplayChatLog,
} from "@/store/admin/types";
import { authorizedFetch } from "@/helpers/general";

export default class AdminService {
  public static async getBannedPlayers(token: string): Promise<BannedPlayersResponse> {
    const url = `${API_URL}api/admin/bannedPlayers?authorization=${token}`;
    const response = await authorizedFetch("GET", url, token);
    return await response.json();
  }

  public static async postBan(bannedPlayer: BannedPlayer, token: string): Promise<string> {
    const url = `${API_URL}api/admin/bannedPlayers/?authorization=${token}`;
    const response = await authorizedFetch("POST", url, token, JSON.stringify(bannedPlayer));
    return response.ok ? "" : await response.json();
  }

  public static async deleteBan(bannedPlayer: BannedPlayer, token: string): Promise<string> {
    const url = `${API_URL}api/admin/bannedPlayers/?authorization=${token}`;
    const response = await authorizedFetch("DELETE", url, token, JSON.stringify(bannedPlayer));
    return response.ok ? "" : (await response.json()).error;
  }

  public static async getQueueData(token: string): Promise<QueueData[]> {
    const url = `${API_URL}api/admin/queue-data/?authorization=${token}`;
    const response = await authorizedFetch("GET", url, token);
    return await response.json();
  }

  public static async getAvailableProxies(token: string): Promise<Proxy[]> {
    const url = `${API_URL}api/admin/proxies/?authorization=${token}`;
    const response = await authorizedFetch("GET", url, token);
    return await response.json();
  }

  public static async searchByTag(battleTagFragment: string, token: string): Promise<SearchedPlayer[]> {
    const url = `${API_URL}api/admin/search/${encodeURIComponent(battleTagFragment)}?authorization=${token}`;
    const response = await authorizedFetch("GET", url, token);
    return await response.json();
  }

  public static async getProxiesForBattletag(battleTag: string, token: string): Promise<ProxySettings> {
    const url = `${API_URL}api/admin/proxies-for/${encodeURIComponent(battleTag)}?authorization=${token}`;

    const response = await authorizedFetch("GET", url, token);
    return await response.json();
  }

  public static async putProxies(proxies: ProxySettings, battleTag: string, token: string): Promise<Response> {
    const url = `${API_URL}api/admin/update-proxies/${encodeURIComponent(battleTag)}?authorization=${token}`;
    return await authorizedFetch("PUT", url, token, JSON.stringify(proxies));
  }

  public static async getAltsForBattletag(btag: string, token: string): Promise<string[]> {
    const url = `${API_URL}api/admin/alts/${encodeURIComponent(btag)}?authorization=${token}`;

    const response = await authorizedFetch("GET", url, token);

    return await response.json();
  }

  public static async getGlobalMutes(token: string): Promise<GloballyMutedPlayer[]> {
    const url = `${API_URL}api/admin/globalChatBans?authorization=${token}`;

    const response = await authorizedFetch("GET", url, token);

    return await response.json();
  }

  public static async deleteGlobalMute(token: string, id: string): Promise<number> {
    const url = `${API_URL}api/admin/globalChatBans/${id}?authorization=${token}`;

    const response = await authorizedFetch("DELETE", url, token);

    return response.status;
  }

  public static async putGlobalMute(token: string, globalMutedPlayer: GlobalMute): Promise<number> {
    const url = `${API_URL}api/admin/globalChatBans/?authorization=${token}`;
    const response = await authorizedFetch("PUT", url, token, JSON.stringify(globalMutedPlayer));
    return response.status;
  }

  public static async getAllSpecialPortraits(token: string): Promise<PortraitDefinition[]> {
    const url = `${API_URL}api/rewards/portrait-definitions?authorization=${token}`;
    const response = await authorizedFetch("GET", url, token);
    return await response.json();
  }

  public static async putPortraits(token: string, command: ChangePortraitsCommand): Promise<number> {
    const url = `${API_URL}api/rewards/portraits?authorization=${token}`;

    const data = {
      BnetTags: command.battleTags,
      Portraits: command.portraitIds,
      Tooltip: command.mouseover,
    } as ChangePortraitsDto;
    const response = await authorizedFetch("PUT", url, token, JSON.stringify(data));

    return response.status;
  }

  public static async deletePortraits(token: string, command: ChangePortraitsCommand): Promise<number> {
    const url = `${API_URL}api/rewards/portraits?authorization=${token}`;

    const data = {
      BnetTags: command.battleTags,
      Portraits: command.portraitIds,
    } as ChangePortraitsDto;

    const response = await authorizedFetch("DELETE", url, token, JSON.stringify(data));

    return response.status;
  }

  public static async getAllPortraitDefinitionGroups(): Promise<PortraitDefinitionGroup[]> {
    const url = `${API_URL}api/rewards/portrait-groups`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }

  public static async postPortraitDefinitions(token: string, definitions: PortraitDefinitionDTO): Promise<number> {
    const url = `${API_URL}api/rewards/portrait-definitions?authorization=${token}`;

    const response = await authorizedFetch("POST", url, token, JSON.stringify(definitions));
    return response.status;
  }

  public static async putPortraitDefinitions(token: string, definitions: PortraitDefinitionDTO): Promise<number> {
    const url = `${API_URL}api/rewards/portrait-definitions?authorization=${token}`;

    const response = await authorizedFetch("PUT", url, token, JSON.stringify(definitions));

    return response.status;
  }

  public static async deletePortraitDefinitions(token: string, definitions: PortraitDefinitionDTO): Promise<number> {
    const url = `${API_URL}api/rewards/portrait-definitions?authorization=${token}`;

    const response = await authorizedFetch("DELETE", url, token, JSON.stringify(definitions));
    return response.status;
  }

  public static async getChatLog(token: string, matchId: string): Promise<ReplayChatLog> {
    const url = `${API_URL}api/replays/${matchId}/chats?authorization=${token}`;

    const response = await authorizedFetch("GET", url, token);
    return response.json();
  }

  public static async checkJwtLifetime(token: string): Promise<boolean> {
    const url = `${API_URL}api/admin/checkJwtLifetime?authorization=${token}`;
    const response = await authorizedFetch("GET", url, token);
    return response.ok;
  }
}
