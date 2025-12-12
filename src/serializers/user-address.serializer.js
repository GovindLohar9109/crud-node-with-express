function userAddressSerializer(data) {
  if (!data) return null;

  let userAddressData = Array.isArray(data) ? data : [data];

  userAddressData = userAddressData.map((address) => {
    address = address.dataValues;
    return {
      id: address.id,
      addressLine: address.address_line,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      createdAt: address.created_at,
      updatedAt: address.updated_at,
    };
  });

  return Array.isArray(data) ? userAddressData : userAddressData[0];
}

module.exports = userAddressSerializer;
