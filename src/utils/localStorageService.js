export default class localStorageService {
  constructor() {

  }

  getItemById(name, id) {
    try {
      const jsonData = localStorage.getItem(name) || "[]";
      const data = JSON.parse(jsonData);
      if (data.length > 0) {
        return data.find(item => item.id === id);
      }
      return null;
    }
    catch {
      console.log('Failed to load local storage document');
      return null;
    }
  }

  getDocument(name) {
    try {
      const jsonData = localStorage.getItem(name) || "[]";
      const data = JSON.parse(jsonData);
      if (data.length == 0) {
        return [];
      }
      return data;
    }
    catch {
      console.log('Failed to load local storage document');
      return [];
    }
  }

  saveDocumentItem(name, documentItem) {
    if (!documentItem.id) {
      this.addNewItem(name, documentItem);
    } else {
      this.updateItem(name, documentItem);
    }
  }

  addNewItem(name, documentItem) {
    documentItem.id = this.getUniqueId();
    const data = this.getDocument(name);
    data.push(documentItem);
    localStorage.setItem(name, JSON.stringify(data));
    return documentItem;
  }

  deleteItem(id, name) {
    if (id) {
      const jsonData = localStorage.getItem(name) || "[]";
      const data = JSON.parse(jsonData);
      const updatedItems = data.filter(item => item.id !== id);
      console.log(updatedItems);
      localStorage.setItem(name, JSON.stringify(updatedItems));
    }
  }

  updateItem(name, documentItem) {
    const data = this.getDocument(name);
    const updatedItems = data.map(item => {
      if (item.id !== documentItem.id) {
        return item;
      }
      return documentItem;
    });
    if (updatedItems.length == 0) {
      updatedItems.push(documentItem);
    }
    localStorage.setItem(name, JSON.stringify(updatedItems));
    console.log('update', updatedItems);
  }

  getUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  }

  clearAllItems() {
    localStorage.clear();
  }
}