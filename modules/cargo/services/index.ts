import AsyncStorage from "@react-native-async-storage/async-storage";
import { FailResponse, SuccessResponse } from "../../../common/http/responses";
import { ICargo } from "../interfaces";
import { _localData } from "../../../common/constants";

const data = require("../../../shipments.json");

export class CargoService {
  static async loadFromJson(): Promise<
    SuccessResponse<ICargo[]> | FailResponse
  > {
    try {
      return new SuccessResponse(data);
    } catch (error: any) {
      return new FailResponse(error.message || "Something went wrong");
    }
  }

  static async getLocalInitialData(): Promise<
    SuccessResponse<ICargo[]> | FailResponse
  > {
    try {
      const data = await AsyncStorage.getItem(_localData);
      if (data) {
        const parsed: ICargo[] = JSON.parse(data);
        return new SuccessResponse(parsed);
      } else {
        return new FailResponse("No data found");
      }
    } catch (error: any) {
      return new FailResponse(error.message || "Something went wrong");
    }
  }
}
