import { DestinationType } from '@/api/types/destination'

export function destinationTypeToEmoji(type: string) {
  if (type === DestinationType.Alpine) {
    return '⛰️'
  } else if (type === DestinationType.City) {
    return '🏙️'
  } else if (type === DestinationType.Coast) {
    return '⛱️'
  } else {
    return type
  }
}
