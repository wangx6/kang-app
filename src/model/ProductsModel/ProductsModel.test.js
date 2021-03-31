/* eslint-disable */
import {ProductsModel } from "./ProductsModel";
import { useContext } from "react";
import { mount, configure } from "enzyme";
import axios from 'axios';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockData = {
  data: [
    { id: '111', name: 'test name 1' },
    { id: '222', name: 'test name 2' },
  ]
};

axios.get = jest.fn();

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
  it("fetch all product", async () => {
    console.log(m);
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData))
    let res = await m.service.fetchAll();
    expect(res).toEqual(mockData);
  });
});
