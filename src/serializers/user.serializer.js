function userSerializer(data) {
  if (!data) return null;
  let userData = Array.isArray(data) ? data : [data];
  userData = userData.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  });
  return Array.isArray(data) ? userData : userData[0];
}

module.exports = userSerializer;
