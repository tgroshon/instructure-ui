/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'
import IconStar from '@instructure/ui-icons/lib/Solid/IconStar'
import IconStarLight from '@instructure/ui-icons/lib/Solid/IconStarLight'
import Rating from '../index'

describe('<Rating />', () => {
  const testbed = new Testbed(
    <Rating label="Course rating" />
  )

  it('should have a title attribute', () => {
    const subject = testbed.render()
    expect(subject.getAttribute('title')).to.equal('Course rating')
  })

  it('should format screenreader text via formatValueText prop', () => {
    const subject = testbed.render({
      formatValueText: function (current, max) {
        return `${current} out of ${max}`
      },
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    expect(subject.getAttribute('aria-valuetext')).to.equal('4 out of 5')
  })

  it('should render the correct number of icons', () => {
    const subject = testbed.render({
      iconCount: 5
    })
    const svg = subject.find(IconStarLight)
    expect(svg.length).to.equal(5)
  })

  it('should handle a valueMax of zero', () => {
    const subject = testbed.render({
      valueMax: 0
    })
    const svg = subject.find(IconStarLight)
    expect(svg.length).to.equal(3)
  })

  it('should fill the correct number of icons', () => {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    const svg = subject.find(IconStar)
    expect(svg.length).to.equal(4)
  })

  it('never renders more than `iconCount` icons', () => {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 110,
      valueMax: 100
    })
    const svg = subject.find(IconStar)
    expect(svg.length).to.equal(5)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()
    subject.should.be.accessible(done)
  })
})
