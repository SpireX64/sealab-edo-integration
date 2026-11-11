/** Ссылка на подписанный финансовый титул 1110345 (таб-19.3). */
import { formatDate, formatTime } from '../../../../helpers'
import type { TFileId } from '../../common/FileId'
export type TCarrierFinancialFileId = TFileId
export function formatCarrierFinancialFileId(data: TCarrierFinancialFileId) {
    return { "ИдФайлПУДИнфПрв": data.fileId, "ДатФайлПУДИнфПрв": formatDate(data.createdAt), "ВрФайлПУДИнфПрв": formatTime(data.createdAt), "ЭП": data.signBase64 }
}
