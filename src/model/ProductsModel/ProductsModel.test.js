import ProductsModel, { ProductsModelContext } from "./ProductsModel";
import { useContext } from "react";
import { mount, configure } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("ProductsModel Test", () => {
  it("fetch all product", () => {
    const TestComponent = () => {
      const { activeProducts, service } = useContext(ProductsModelContext);

      return (
        <>
          <div data-testid="activeProducts">{activeProducts}</div>
          <button onClick={service.fetchAll()}>Fetch All</button>
        </>
      );
    };

    const wrapper = mount(
      <ProductsModel>
        <TestComponent />
      </ProductsModel>
    );

    expect(wrapper.find('[data-testid="activeProducts"]').text()).toEqual([]);
    wrapper.find("button").simulate("click");
    expect(wrapper.find('[data-testid="activeProducts"]').text()).toEqual([1]);
  });
});
