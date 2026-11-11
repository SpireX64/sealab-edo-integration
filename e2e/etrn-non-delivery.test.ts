import {expect,test} from "vitest";
import {formatCarrierWaybillInfo} from "../src/docs/etrn/1110342/data/15.4-CarrierWaybillInfo";
test("positive delivery stays unchanged and non-delivery requires factual text",()=>{
 expect(formatCarrierWaybillInfo({waybillId:"uid",delivered:true}).СодОпер).toContain("Груз с указанными характеристиками сдан");
 expect(formatCarrierWaybillInfo({waybillId:"uid",delivered:false,nonDeliveryDescription:"Груз не принят получателем"}).СодОпер).toBe("Груз не принят получателем");
 for(const description of [undefined,""," ","я".repeat(256)]) expect(()=>formatCarrierWaybillInfo({waybillId:"uid",delivered:false,...(description === undefined ? {} : {nonDeliveryDescription:description})})).toThrow();
 expect(()=>formatCarrierWaybillInfo({waybillId:"uid",delivered:true,nonDeliveryDescription:"противоречие"})).toThrow();
});
