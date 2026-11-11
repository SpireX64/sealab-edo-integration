/** Синтетический пример 1110385 для локального тестирования, без реальной ЭП. */
import { MedicalExamKind, type TDocument1110385 } from '../../src/docs/epl/1110385'
import { epl1110381Fixture } from './epl-2'

export const epl1110385Fixture: TDocument1110385 = {
    arrivalFileId: {
        fileId: 'ON_PTLSODPARK_TEST',
        fileDateTime: new Date('2026-09-10T14:00:00Z'),
        signature: 'VEVTVA==',
    },
    content: {
        ...epl1110381Fixture.content,
        examKind: MedicalExamKind.PostTrip,
        examPassInfo: {
            examDateTime: new Date('2026-09-10T14:15:00Z'),
            passed: true,
            driver: epl1110381Fixture.content.examPassInfo.driver,
        },
    },
    signer: epl1110381Fixture.signer,
}
