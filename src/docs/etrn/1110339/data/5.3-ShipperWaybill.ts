/**
 * Содержание транспортной накладной, информация грузоотправителя
 * (СодИнфГО, таб-5.3)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatOrderFile, type TOrderFile } from './5.4-OrderFile';
import { formatShipperInfo, type TShipperInfo } from './5.5-ShipperInfo';
import { formatTransportCustomerInfo, type TTransportCustomerInfo } from './5.6-TransportCustomerInfo';
import { formatConsigneeInfo, type TConsigneeInfo } from './5.7-ConsigneeInfo';
import { formatPartyDetails, type TPartyDetails } from './5.29-PartyDetails';
import { formatCargoInfo, type TCargoInfo } from './5.8-CargoInfo';
import { formatAccompaningDocs, type TAccompaningDocs } from './5.11-AccompaningDocs';
import { formatShipperInstructions, type TShipperInstructions } from './5.12-ShipperInstructions';
import { formatDriverInfo, type TDriverInfo } from './5.15-DriverInfo';
import { formatVehicleInfo, type TVehicleInfo } from './5.16-VehicleInfo';
import { formatLoadingInfo, type TLoadingInfo } from './5.17-LoadingInfo';
import { formatShipperNote, type TShipperNote } from './5.21-ShipperNote';
import { formatWaybillCorrection, type TWaybillCorrection } from './5.43-WaybillCorrection';
import { formatInfoField, type TInfoField } from './5.44-InfoField';

export type TShipperWaybill = {
    waybill: {
        /**
         * Уникальный идентификатор документа транспортной накладной
         * (1-1000)
         * Выдается ГИС ЭПД. До начала функционирования ГИС ЭПД принимает значение "Без номера"
         */
        id?: number

        /** Порядковый номер транспортной накладной (1-1000) */
        number: number;

        /** Дата составления транспортной накладной */
        date: Date;
    },
    order: {
        /** Порядковый номер заказа/заявки (1-1000) */
        number: number

        /** Дата заказа/заявки */
        date: Date;

        /** Файл обмена заявки */
        file?: TOrderFile
    },

    /** Сведения о грузоотправителе */
    shipper: TShipperInfo

    /**
     * Сведения о заказчике услуг по организации перевозки груза,
     * связанных с перевозкой груза
     * 
     * (Обязателено для экспедитора)
     */
    customer?: TTransportCustomerInfo

    /** Сведения о грузополучателе */
    consignee: TConsigneeInfo

    /**
     * Описание действий.
     * @example "Лицом, осуществляющим погрузку груза, при указанных обстоятельствах передан водителю груз с указанными характеристиками"
     */
    operationDesc: string

    /** Сведения о сопроводительных документах на груз */
    accompanyingDocs?: TAccompaningDocs

    /** Сведения о грузе */
    cargo: TCargoInfo[]

    /** Сведения грузоотправителя о передаче груза при приеме груза перевозчиком */
    loadingInfo: TLoadingInfo

    /** Сведения о перевозчике */
    carrier: TPartyDetails

    /** Информационное поле */
    infoField?: TInfoField[]

    /** Сведения о водителе */
    driverInfo: TDriverInfo[]

    /** Сведения о транспортном средстве */
    vehicleInfo: TVehicleInfo

    /** Сведения об указаниях грузоотправителя по особым условиям перевозки */
    shipperInstructions: TShipperInstructions

    /** Сведения об отметках грузоотправителя */
    shipperNotes?: TShipperNote[]

    /**
     * Исправление.
     * (таб-5.43)
     */
    correction: TWaybillCorrection
}

export function formatShipperWaybill(data: TShipperWaybill) {
    if (data.shipper.isForwarder && !data.customer) {
        throw new TypeError("Требуется указать сведения о заказчике услуг")
    }

    return {
        "УИД_ТрН": data.waybill.id,
        "СодОпер": data.operationDesc, 
        "НомерТрН": data.waybill.number,
        "ДатаТрН": formatDate(data.waybill.date),
        "НомЗак": data.order.number,
        "ДатаЗак": formatDate(data.order.date),
        "ИдЗак": data.order.file && formatOrderFile(data.order.file),
        "ИспрТрН": formatWaybillCorrection(data.correction),
        "СвГО": formatShipperInfo(data.shipper),
        "СвЗак": data.customer && formatTransportCustomerInfo(data.customer),
        "СвГП": formatConsigneeInfo(data.consignee),
        "СвГруз": data.cargo.map(formatCargoInfo),
        "СопрДок": data.accompanyingDocs && formatAccompaningDocs(
            data.accompanyingDocs,
            data.cargo.some(c => c.description.some(d => d.name === "Контейнер")),
        ),
        "УказГО": formatShipperInstructions(data.shipperInstructions),
        "СвПер": formatPartyDetails(data.carrier),
        "СвВодит": data.driverInfo.map(formatDriverInfo),
        "СвТС": formatVehicleInfo(data.vehicleInfo),
        "СвПогруз": formatLoadingInfo(data.loadingInfo),
        "ОтметГО": mapArrayIfNotEmpty(data.shipperNotes, formatShipperNote),
        "ИнфПол": data.infoField?.map(formatInfoField),
    }
}
