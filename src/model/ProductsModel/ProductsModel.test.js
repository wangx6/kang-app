/* eslint-disable */
import { ProductsModel } from "./ProductsModel";
import { mount, configure } from "enzyme";
import axios from "axios";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

/* ############ MAIN SETUP ################ */
// MOCK DATA
// USED THROUGHOUT THE TESTS
let testData = { id: "333", name: "kang" };
let mockData = {
  data: [
    { id: "111", name: "test name 1" },
    { id: "222", name: "test name 2" },
    testData,
  ],
};

// MOCK AXIOS GET FUNCTION
axios.get = jest.fn();

// MODEL INSTANCE
let m;

// WRAPPER FOR INITIALIZE THE MODEL INSTANCE
// THIS IS DUE TO HOOKS HAS TO BE WRAPPED BY A FUNCTIONAL COMPONENT
function setupModel() {
  function Wrapper() {
    m = ProductsModel();
    return null;
  }
  return mount(<Wrapper></Wrapper>);
}

beforeAll(() => {
  setupModel();
});

// UTIL FUNCTION FOR INVOKING "ACT" FUNCTION
const run = (setFn, args) => {
  act(() => setFn(args));
};

beforeEach(() => {
  // clear products
  act(() => m.service.setProducts([]));

  // RESET MOCK DATA
  testData = { id: "333", name: "kang" };
  mockData = {
    data: [
      { id: "111", name: "test name 1" },
      { id: "222", name: "test name 2" },
      testData,
    ],
  };
});

/* ############  ENTERPRISE ENGAGE ################ */
describe("ProductsModel Test", () => {
  it("fetch all product", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    const res = await m.service.fetchAll();
    expect(res).toEqual(mockData);
  });

  it("get product by id", () => {
    run(m.service.setProducts, mockData.data);
    const res = m.service.getProductById(testData.id);
    expect(res).toEqual(testData);
  });

  it("filter product by name", () => {
    run(m.service.setProducts, mockData.data);
    run(m.service.filterProductByName, testData.name);
    expect(m.activeProducts).toEqual([testData]);
  });

  it("select product", () => {
    run(m.service.setProducts, mockData.data);
    run(m.service.selectProduct, testData);
    const expected = m.activeProducts.find((p) => p.id === testData.id);
    expect(expected.selected).toEqual(true);
  });

  it("add random product", () => {
    const len = mockData.data.length;
    run(m.service.setProducts, mockData.data);
    expect(m.activeProducts.length).toEqual(len);
    run(m.service.addRandomProduct);
    expect(m.activeProducts.length).toEqual(len + 1);
    run(m.service.addRandomProduct);
    expect(m.activeProducts.length).toEqual(len + 2);
    run(m.service.addRandomProduct);
    expect(m.activeProducts.length).toEqual(len + 3);
  });

  it("deleteSelected", () => {
    run(m.service.setProducts, mockData.data);
    run(m.service.selectProduct, testData);
    let expected = m.activeProducts.find((p) => p.id === testData.id);
    expect(expected.selected).toEqual(true);

    run(m.service.deleteSelected);
    expected = m.activeProducts.find((p) => p.id === testData.id);
    expect(expected).toEqual(undefined);
  });

  it("getAll", () => {
    // verify activeProducts is empty at init stage
    expect(m.activeProducts.length).toEqual(0);

    // set the products
    run(m.service.setProducts, mockData.data);

    // run getAll
    run(m.service.getAll);

    // check if active products is the same as the products
    expect(m.activeProducts).toEqual(m.products);

    // set active products to be different
    run(m.service.setActiveProducts, [testData]);

    // verify if the products length is now the same as the reset product length
    expect(m.activeProducts.length).toEqual(1);

    // invoke "getAll" again
    run(m.service.getAll);

    // verify if active products is the same to the products
    expect(m.activeProducts).toEqual(m.products);
  });
});
