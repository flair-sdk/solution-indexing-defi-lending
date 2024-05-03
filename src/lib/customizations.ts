import { AppError } from 'flair-sdk'

export type DefiLendingCustomizations = {
  onBorrowAPY?: (asset: string, protocol: string, borrowAPY: string) => Promise<void>
}

let _customizations: DefiLendingCustomizations | null
try {
  if (process.env.CUSTOMIZATIONS_FILE_PATH) {
    _customizations = require(process.env.CUSTOMIZATIONS_FILE_PATH);
    console.debug(`process.env.CUSTOMIZATIONS_FILE_PATH ${process.env.CUSTOMIZATIONS_FILE_PATH}`);
    console.debug(`Loaded customizations from ${_customizations}`);
    console.debug('...((_customizations as any)?.default || {})', ...((_customizations as any)?.default || {})); 
  }
} catch (err: any) {
  throw AppError.causedBy(err, {
    code: 'DefiLendingCustomizations',
    message:
      'Failed to load customizations script for DefiLendingCustomizations.',
    details: {
      path: process.env.CUSTOMIZATIONS_FILE_PATH,
    },
  })
}

export const Customizations: DefiLendingCustomizations = {
  ...((_customizations as any)?.default || {}),
  ...(_customizations || {}),
}