import EmbedField from './EmbedField';

/**
 * Embed object.
 *
 * @link https://discordapp.com/developers/docs/resources/channel#embed-object
 */
export default interface Embed {
  /**
   * Title of the embed.
   * Up to 256 characters.
   */
  title?: string;

  /**
   * Embed type.
   * (Always "rich" for webhook embeds)
   */
  type?: 'rich';

  /**
   * URL of embed.
   */
  url?: string;

  /**
   * Description of the embed.
   * Up to 2048 characters.
   */
  description?: string;

  /**
   * ISO8601 timestamp of the embed content.
   */
  timestamp?: string;

  /**
   * color code of the embed.
   */
  color?: number;


  /**
   * Fields information.
   * Up to 25 fields.
   */
  fields?: EmbedField[];
}
