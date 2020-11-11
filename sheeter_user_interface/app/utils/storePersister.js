export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('sheeter_app');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
};
  
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      return localStorage.setItem('sheeter_app', serializedState);
    } catch (e) {
      return undefined;
    }
};