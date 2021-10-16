import { SWITCH_IS_MOBILE_VALUE, CLOSE_HEADER_POPUP, OPEN_HEADER_POPUP } from '../constants/index';

interface IOpenHeaderPopup {
    readonly type: typeof OPEN_HEADER_POPUP;
}

interface ICloseHeaderPopup {
    readonly type: typeof CLOSE_HEADER_POPUP;
}

interface ISwitchIsMobile {
    readonly type: typeof SWITCH_IS_MOBILE_VALUE;
    readonly value: Number;
}

export type TIndexActions = IOpenHeaderPopup | ICloseHeaderPopup | ISwitchIsMobile;