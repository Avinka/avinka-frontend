import {convertToElasticSearchQuery, MatchQuery} from "../lib/query/convertToElasticSearchQuery";
import {Selector} from "../lib/query/selector";

test("convert selectors to query", () =>{
    let selector = new Selector();
    selector.key = 'actor.name';
    selector.value = 'person';
    selector.operator = '=';
    let result = new MatchQuery('actor.name', 'person');
    expect(convertToElasticSearchQuery(selector)).toEqual(result);
});
