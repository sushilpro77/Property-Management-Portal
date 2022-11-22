const selectProperties = (state) => {
  return state.properties.data;
};

const selectPropertyDetails = (state, id) => {
  const property = state.properties.data.filter(
    (property) => property.id === id
  );
  return property.length ? property[0] : {};
};

const selectPropertyStats = (state) => {
  if (!state?.properties?.propertyStats) {
    return {
      names: [],
      counts: [],
    };
  }

  const names = state.properties.propertyStats.map((stats) => stats.name);
  const counts = state.properties.propertyStats.map((stats) => stats.value);

  return {
    names,
    counts,
  };
};

export { selectProperties, selectPropertyDetails, selectPropertyStats };
