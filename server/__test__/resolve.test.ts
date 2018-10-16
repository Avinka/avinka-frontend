import {resolver} from "../lib/query/resolver";


test("resolve test", () =>{
    expect(resolver("")).toBe("foo");
});
