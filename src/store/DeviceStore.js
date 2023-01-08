import { makeAutoObservable, runInAction } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    this._basketDevices = [];
    this._totalSum = 0;
    this._rate = 0;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(device) {
    this._devices = device;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }

  setPage(page) {
    runInAction(() => {
      this._page = page;
    });
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  setBasketDevice(basketDevice) {
    this._basketDevices.push(basketDevice);
  }

  setBasketDevices(basketDevice) {
    this._basketDevices = basketDevice;
  }

  updateBasket(device) {
    const devices = this._basketDevices.map((elem) => {
      return elem.date.id === device.date.id
        ? { ...elem, quantity: device.quantity }
        : elem;
    });
    this._basketDevices = devices;
  }

  setTotalSum() {
    let deviceArr = this._basketDevices.map((elem) => {
      return Number(elem.date.price) * Number(elem.quantity);
    });
    this._totalSum = deviceArr.reduce(function (a, b) {
      return a + b;
    });
  }

  updateRating(id, rate) {
    let updateDevices = this._devices.map((elem) => {
      return elem.id === Number(id) ? { ...elem, rating: rate } : elem;
    });
    this._devices = updateDevices;
  }

  setRate(id) {
    const device = this._devices.find((elem) => {
      return elem.id === Number(id);
    });
    this._rate = device.rating;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    this.setPage(1);
    return this._selectedType;
  }

  get selectedBrand() {
    this.setPage(1);
    return this._selectedBrand;
  }

  get page() {
    return this._page;
  }

  get totalPages() {
    return Math.ceil(this._totalCount / this._limit);
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }

  get basketDevices() {
    return this._basketDevices;
  }

  get totalSum() {
    return this._totalSum;
  }

  get rate() {
    return this._rate;
  }
}
