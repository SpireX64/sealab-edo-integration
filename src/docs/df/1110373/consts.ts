/** Функция договора фрахтования (приказ ФНС ЕД-7-26/109@). */
export enum CharterFunction { Cargo='Cargo',Passengers='Passengers' }
export function formatCharterFunction(value:CharterFunction) {
    switch(value) {case CharterFunction.Cargo:return '0';case CharterFunction.Passengers:return '1';default:throw new TypeError('Не указана функция договора фрахтования')}
}
export { SignatureType,AuthorityConfirmationMethod,formatSignatureType,formatAuthorityConfirmationMethod } from '../../ezz/1110361/consts'
export { AddressType,MunicipalDistrictKind,SettlementKind } from '../../epl/1110380/consts'
