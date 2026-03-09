import { shallowMount } from "@vue/test-utils";
import OrderSummary from "@/components/OrderSummary.vue";

describe("OrderSummary.vue", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      state: {
        lastOrderId: "ABC123",
      },
      getters: {
        cantidadCarrito: 3,
        totalCarrito: 15000,
      },
      dispatch: jest.fn(),
    };

    wrapper = shallowMount(OrderSummary, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });
  });

  it("muestra el resumen correcto", () => {
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("15000");
  });

  it("ejecuta checkout al hacer click", async () => {
    await wrapper.find("button").trigger("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith("realizarCompra");
  });

  it("muestra el último ID de compra", () => {
    expect(wrapper.text()).toContain("ABC123");
  });
});