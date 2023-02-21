const { deterministicPartitionKey, createPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns different from input when input is ok", () => {
    const partitionKey = deterministicPartitionKey("test");
    expect(partitionKey).not.toBe("test");
  });

  it("Returns hashed partition key when a given input is ok", () => {
    const simpleHashing = () => "hashed";
    const partitionKey = createPartitionKey(simpleHashing)("test");
    expect(partitionKey).toBe("hashed");
  });

  it("Returns the same partition keys when given the same inputs", () => {
    const firstKey = deterministicPartitionKey("test");
    const secondKey = deterministicPartitionKey("test");
    expect(firstKey).toBe(secondKey);
  });

  it("Returns different partition keys when given different inputs", () => {
    const firstKey = deterministicPartitionKey("test-one");
    const secondKey = deterministicPartitionKey("test-two");
    expect(firstKey).not.toBe(secondKey);
  });

  it("Returns partition key with less than 256 characters", () => {
    const bigKey = "test".repeat(256);
    const partitionKeyLength = deterministicPartitionKey(bigKey).length;
    expect(partitionKeyLength).toBeLessThan(256);
  });

  it("Returns received partition key if less than 256 characters", () => {
    const event = { partitionKey: "test" };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(event.partitionKey);
  });

  it("Returns hashed partition key if more than 256 characters", () => {
    const bigKey = "test".repeat(256);
    const event = { partitionKey: bigKey };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).not.toBe(event.partitionKey);
  });

  it("Returns stringfied received partition key if less than 256 characters", () => {
    const event = { partitionKey: 123 };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe("123");
  });

  it("Returns hashed partition key if event is an object without partition key", () => {
    const event = { test: 1 };
    const simpleHashing = () => "hashed";
    const partitionKey = createPartitionKey(simpleHashing)(event);
    expect(partitionKey).toBe("hashed");
  });
});
