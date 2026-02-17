export enum EstadoPedido {
  PENDIENTE = 'Pendiente',
  APROBADO = 'Aprobado',
  EN_PROCESO = 'EnProceso',
  ENVIADO = 'Enviado',
  RECIBIDO = 'Recibido',
  CANCELADO = 'Cancelado'
}

export const ESTADO_PEDIDO_LABEL: Record<string, string> = {
  [EstadoPedido.PENDIENTE]: 'Pendiente',
  [EstadoPedido.APROBADO]: 'Aprobado',
  [EstadoPedido.EN_PROCESO]: 'En Proceso',
  [EstadoPedido.ENVIADO]: 'Enviado',
  [EstadoPedido.RECIBIDO]: 'Recibido',
  [EstadoPedido.CANCELADO]: 'Cancelado'
};
