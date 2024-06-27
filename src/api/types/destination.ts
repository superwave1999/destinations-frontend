export enum DestinationType {
  Alpine = 'alpine',
  City = 'city',
  Coast = 'coast'
}

export interface Destination extends DestinationEditable {
  id: number
  createdAt: string
  updatedAt: string | null
}

export interface DestinationEditable {
  name: string
  description: string
  countryCode: string
  type: DestinationType
}
