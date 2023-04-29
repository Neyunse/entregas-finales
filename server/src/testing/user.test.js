import UserModel from '../dao/schemas/user.js'
import { mongoURL } from '../config/configApp.js'
import mongoose from 'mongoose'

import { strict as assert } from 'assert'

mongoose.connect(mongoURL)

describe('User Testing', () => {
    it('Get Users', async function () {
        const result = await UserModel.find()
        assert.ok(result)
        assert.strictEqual(Array.isArray(result), true)
    })
    before(async function () {
        await UserModel.collection.drop()
    })
    it('Insert User', async function () {
        const mockUser = {
            username: 'Mock User',
            email: 'mock@example.com',
            password: '123',
        }
        const result = await UserModel.create(mockUser)
        assert.ok(result._id)
    })
})
