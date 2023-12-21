import { Test } from '@nestjs/testing';
import { MessageHelper } from './message.helper';

describe('MessageHelper', () => {
    let messageHelper: MessageHelper;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [MessageHelper],
        }).compile();

        messageHelper = moduleRef.get<MessageHelper>(MessageHelper);
    });

    it('getMessage basic test', () => {
        const array1 = ["este", "", "", "mensaje", ""]
        const array2 = ["", "es", "", "", "secreto"]
        const array3 = ["este", "", "un", "", ""]

        const expResult = ["este", "es", "un", "mensaje","secreto"]

        const result = messageHelper.getMessage(array1, array2, array3)
        expect(result).toStrictEqual(expResult);
    })

    it('getMessage basic test with shift', () => {
        const array1 = ["", "este", "es", "un", "mensaje"];
        const array2 = ["este", "", "un", "mensaje"];
        const array3 = ["", "", "es", "", "mensaje"];

        const expResult = ["este", "es", "un", "mensaje"]

        const result = messageHelper.getMessage(array1, array2, array3)
        expect(result).toStrictEqual(expResult);
    })

})