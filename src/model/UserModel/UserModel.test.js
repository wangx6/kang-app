/* eslint-disable */
import { UserModel } from "./UserModel";
import { mount, configure } from "enzyme";
import axios from "axios";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

/* ############ MAIN SETUP ################ */
// MOCK DATA
// USED THROUGHOUT THE TESTS
const mockData = {
  data: { id: "xxx", email: "xxx" },
};

// mock axios get function
axios.get = jest.fn();

// model instance
let m;

// wrapper for initialize the model instance
// this is due to hooks has to be wrapped by a functional component
function setupModel() {
  function Wrapper() {
    m = UserModel();
    return null;
  }
  return mount(<Wrapper></Wrapper>);
}

// UTIL FUNCTION FOR INVOKING "ACT" FUNCTION
const run = (setFn, arg1, arg2) => {
  act(() => setFn(arg1, arg2));
};

beforeAll(() => setupModel());

beforeEach(() => {
  // ensure not login
  act(() => m.service.setIsAuth(false));
});

/* ############  ENTERPRISE ENGAGE ################ */
describe("UserModel Test", () => {
  it("get user", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    const res = await m.service.getUser("xxx");
    expect(res).toEqual(mockData);
  });

  it("valid user", () => {
    expect(m.isAuth).toEqual(false);
    run(m.service.validateUser, mockData.data, "xxx");
    expect(m.isAuth).toEqual(true);
  });

  it("not auth without login", () => {
    expect(m.isAuth).toEqual(false);
  });

  it("invalid user", () => {
    expect(m.isAuth).toEqual(false);
    run(m.service.validateUser, mockData.data, "invalid");
    expect(m.isAuth).toEqual(false);
  });
});
