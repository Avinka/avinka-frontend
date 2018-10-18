import {buildESQuery} from "../lib/query/buildESQuery";
import {Selector} from "../lib/query/selector";

test("convert equals selector to query", () => {
    let equalsSelector = new Selector();
    equalsSelector.key = 'actor.name';
    equalsSelector.operator = '=';
    equalsSelector.value = 'person';
    expect(buildESQuery(equalsSelector)).toEqual({
        'match': {
            'actor.name': 'person'
        }
    });
});

test("convert range selector to query", () => {
    let gteSelector = new Selector();
    gteSelector.key = 'actor.age';
    gteSelector.operator = '>';
    gteSelector.value = '10';
    expect(buildESQuery(gteSelector)).toEqual({
        'range': {
            'actor.age': {
                'gt': '10'
            }
        }
    });
});
