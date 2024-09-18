import {
  LoginEntity,
  LoginResponse,
  RegisterEntity,
  User,
} from "../entity/auth-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";

const login = async (payload: LoginEntity) =>
  (await fetchWrapper.auth("/login", payload)) as LoginResponse;

//eslint-disable-next-line
const register = async (payload: RegisterEntity) =>
  await fetchWrapper.post("/register", payload);

const getProfile = async () => (await fetchWrapper.get("/auth/me")) as User;

export const authService = {
  login,
  register,
  getProfile,
};
