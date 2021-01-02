import axios from "axios";

const API_KEY = '19193969-87191e5db266905fe8936d565';
const DEFAULT_COUNT = 27;
const DEFAULT_REQUEST = 'night city';

export class ImagesRepository {
    constructor(apiKey = API_KEY) {
        this._baseUrl = `https://pixabay.com/api/?key=${apiKey}&image_type=photo`;
    }

    get(request= DEFAULT_REQUEST, count=DEFAULT_COUNT) {
        const req = this._reqPreprocessor(request);
        const url = this._imagesListReqUrl(req, count);
        return axios.get(url)
            .then(res => {
                const data = res.data['hits'];
                return data.map(item => item['largeImageURL']);
            })
            .catch(() => ([]));
    }

    _reqPreprocessor(request) {
        return request.replaceAll(" ", "+");
    }
    _imagesListReqUrl(request, count) {
        return this._baseUrl + `&q=${request}&per_page=${count}`;
    }
}
