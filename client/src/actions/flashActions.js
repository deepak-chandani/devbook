import { SET_FLASH_MESSAGE } from "./types";

export const setFlashMessage = (data) => {
    return {
        type: SET_FLASH_MESSAGE,
        payload: data
    }
};

