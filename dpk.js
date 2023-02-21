const crypto = require("crypto");

const deterministicHashing = data => crypto.createHash("sha3-512").update(data).digest("hex");

const hashEventPartitionKey = (hashFn, eventKey) => {
  const MAX_EVENT_PARTITION_KEY_LENGTH = 256;
  const partitionKey = typeof eventKey === "string" ? eventKey : JSON.stringify(eventKey);
  return partitionKey.length > MAX_EVENT_PARTITION_KEY_LENGTH ? hashFn(partitionKey) : partitionKey;
}

const createPartitionKey = hashFn => event => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return hashFn(JSON.stringify(event));
  }
  
  return hashEventPartitionKey(hashFn, event.partitionKey)
};

const deterministicPartitionKey = createPartitionKey(deterministicHashing)

module.exports = { createPartitionKey, deterministicPartitionKey }
