/* eslint-disable */
import { ProductsModel } from "./ProductsModel";
import { mount, configure } from "enzyme";
import axios from "axios";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

const testData = { id: "333", name: "kang" };
const mockData = {
  data: [
    { id: "111", name: "test name 1" },
    { id: "222", name: "test name 2" },
    testData,
  ],
};

axios.get = jest.fn();

let m;

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

// afterEach(() => {
//   act(() => m.service.setProducts([]));
// });

describe("ProductsModel Test", () => {
  it("fetch all product", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    const res = await m.service.fetchAll();
    expect(res).toEqual(mockData);
  });

  it("get product by id", () => {
    act(() => {
      m.service.setProducts(mockData.data);
    });
    const res = m.service.getProductById(testData.id);
    expect(res).toEqual(testData);
  });

  it("filter product by name", () => {
    act(() => {
      m.service.setProducts(mockData.data);
      m.service.filterProductByName(testData.name);
    });

    console.log(m.activeProducts);

    expect(m.activeProducts).toEqual([testData]);
  });

  it("filter product by name", () => {
    act(() => {
      m.service.setProducts(mockData.data);
      m.service.filterProductByName(testData.name);
    });

    expect(m.activeProducts).toEqual([testData]);
  });

  it("select product", () => {
    act(() => {
      m.service.setProducts(mockData.data);
      m.service.selectProduct(testData);
    });
    const expected = mockData.data.filter((p) => p != testData);
    expected.push({ ...testData, selected: true });
    expect(m.activeProducts).toEqual(expected);
  });

  it("add random product", () => {
    act(() => {
      m.service.setProducts(mockData.data);
      m.service.addRandomProduct();
    });
    expect(m.activeProducts.length).toEqual(mockData.data.length + 1);
  });

  it("deleteSelected", () => {
    act(() => {
      m.service.setProducts(mockData.data);
      console.log(m.activeProducts);
    });
    act(() => {
      m.service.selectProduct(testData);
      m.service.deleteSelected();
    });
    const expected = mockData.data.filter((p) => p != testData);

    console.log(expected);
    expect(m.activeProducts).toEqual(expected);
  });
});
