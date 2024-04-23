import { Client } from "../Client";
import { InviteBotDestination, DataEditBot, DataCreateBot } from "revolt-api";
export default class Bots {
    client: Client;
    constructor(client: Client);
    /**
     * Fetch a bot
     * @param id Bot ID
     * @returns Bot and User object
     */
    fetch(id: string): Promise<{
        bot: {
            _id: string;
            owner: string;
            token: string;
            public: boolean;
            analytics?: boolean | undefined;
            discoverable?: boolean | undefined;
            interactions_url?: string | null | undefined;
            terms_of_service_url?: string | null | undefined;
            privacy_policy_url?: string | null | undefined;
            flags?: number | null | undefined;
        };
        user: import("./Users").User;
    }>;
    /**
     * Delete a bot
     * @param id Bot ID
     */
    delete(id: string): Promise<void>;
    /**
     * Fetch a public bot
     * @param id Bot ID
     * @returns Public Bot object
     */
    fetchPublic(id: string): Promise<{
        _id: string;
        username: string;
        avatar: string;
        description: string;
    }>;
    /**
     * Invite a public bot
     * @param id Bot ID
     * @param destination The group or server to add to
     */
    invite(id: string, destination: InviteBotDestination): Promise<undefined>;
    /**
     * Fetch a bot
     * @param id Bot ID
     * @returns Bot and User objects
     */
    fetchOwned(): Promise<{
        bots: {
            _id: string;
            owner: string;
            token: string;
            public: boolean;
            analytics?: boolean | undefined;
            discoverable?: boolean | undefined;
            interactions_url?: string | null | undefined;
            terms_of_service_url?: string | null | undefined;
            privacy_policy_url?: string | null | undefined;
            flags?: number | null | undefined;
        }[];
        users: import("./Users").User[];
    }>;
    /**
     * Edit a bot
     * @param id Bot ID
     * @param data Bot edit data object
     */
    edit(id: string, data: DataEditBot): Promise<void>;
    /**
     * Create a bot
     * @param data Bot creation data
     */
    create(data: DataCreateBot): Promise<{
        bot: {
            _id: string;
            owner: string;
            token: string;
            public: boolean;
            analytics?: boolean | undefined;
            discoverable?: boolean | undefined;
            interactions_url?: string | null | undefined;
            terms_of_service_url?: string | null | undefined;
            privacy_policy_url?: string | null | undefined;
            flags?: number | null | undefined;
        };
        user: import("./Users").User;
    }>;
}
