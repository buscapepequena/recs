import type { MarketText } from "@/types/market.types";
import type { RequestPayload } from "@/types/requests.types";

export interface InboxRequest {
  id: string;
  from: string;
  sentAt: number;
  payload: RequestPayload;
}

export interface WorkshopKey {
  secret: Uint8Array;
  pubkey: string;
}

export interface WorkshopInboxProps {
  text: MarketText;
  htmlLang: string;
}

export interface WorkshopRequestCardProps {
  request: InboxRequest;
  text: MarketText;
  htmlLang: string;
}
