import Embed from './Embed.js';
import Attachment from './Attachment.js';

interface Base {
  /**
   * Webhook username override.
   */
  username?: string;

  /**
   * Webhook avatar override.
   */
  avatar_url?: string;

  /**
   * Whether or not this notification should be read as text to speech.
   */
  tts?: boolean;
}

interface Content {
  /**
   * Message contents.
   * Max 2000 characters
   */
  content: string;
}

interface File {
  /**
   * Contents of a file being sent.
   */
  file: Attachment | string;
}

interface Embeds {
  /**
   * Embedded "rich" content.
   */
  embeds: Embed[];
}

/**
 * Discord webhook execution content.
 *
 * @link https://discordapp.com/developers/docs/resources/webhook#execute-webhook
 */
export type POST = (Base & Content) | File | Embeds;
