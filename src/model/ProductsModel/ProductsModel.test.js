/* eslint-disable */
import {ProductsModel } from "./ProductsModel";
import { useContext } from "react";
import { mount, configure } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

let m;

function setupModel() {
  function Wrapper() {
    m = ProductsModel();
    return null;
  }
  return mount(<Wrapper></Wrapper>)
}

beforeAll(() => {
  setupModel();
});

describe("ProductsModel Test", () => {
  it("fetch all product", () => {
    console.log(m);
    expect(1).toBe(1);
  });
});
