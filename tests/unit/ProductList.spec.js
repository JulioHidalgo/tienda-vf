import { shallowMount } from "@vue/test-utils";
import Products from "@/components/ProductList.vue";

describe("ProductList.vue", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      state: {
        products: [
          {
            id: "1",
            name: "Producto 1",
            description: "Descripción 1",
            price: 1000,
            image: "https://via.placeholder.com/150",
          },
        ],
        loadingProducts: false,
      },
      getters: {
        isAuthenticated: true,
      },
      dispatch: jest.fn(),
    };

    wrapper = shallowMount(Products, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });
  });

  it("renderiza productos correctamente", () => {
    expect(wrapper.text()).toContain("Producto 1");
    expect(wrapper.text()).toContain("Descripción 1");
    expect(wrapper.text()).toContain("$ 1000");
  });

  it("despacha addToCart al hacer click", async () => {
    await wrapper.find("button").trigger("click");

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, "agregarAlCarrito", {
      id: "1",
      name: "Producto 1",
      price: 1000,
    });
  });
});