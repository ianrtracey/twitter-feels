"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var router_1 = require("next/router");
var react_2 = require("react");
var Search = function (_a) {
    var onEnterPress = _a.onEnterPress;
    var router = (0, router_1.useRouter)();
    var _b = (0, react_2.useState)(''), query = _b[0], setQuery = _b[1];
    (0, react_1.useEffect)(function () {
        var keyDownHandler = function (event) {
            console.log('User pressed: ', event.key);
            if (event.key === 'Enter') {
                event.preventDefault();
                // 👇️ your logic here
                onEnterPress(query);
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return function () {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [query]);
    return (<div className='text-center my-64'>
      <h1 className='text-3xl font-extrabold text-blue-400'>Twitter Feels</h1>
      <p>Realtime sentiment analysis about topics on Twitter</p>
      <div className='md:w-[584px] mx-auto mt-7 flex w-[100%] items-center rounded-full border hover:shadow-md'>
        <div className='pl-5'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
          </svg>
        </div>
        <input type='text' className='w-full bg-transparent rounded-full py-[14px] pl-4 outline-none' placeholder='elon musk' onChange={function (event) { return setQuery(event.target.value); }}/>
      </div>
    </div>);
};
exports.default = Search;
