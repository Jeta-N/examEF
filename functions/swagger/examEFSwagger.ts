//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class ExamEFClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param fileName (optional) 
     * @return Success
     */
    blobGET(fileName: string | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/blob?";
        if (fileName === null)
            throw new Error("The parameter 'fileName' cannot be null.");
        else if (fileName !== undefined)
            url_ += "fileName=" + encodeURIComponent("" + fileName) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlobGET(_response);
        });
    }

    protected processBlobGET(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as string;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    /**
     * @param fileName (optional) 
     * @return Success
     */
    blobDELETE(fileName: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/blob?";
        if (fileName === null)
            throw new Error("The parameter 'fileName' cannot be null.");
        else if (fileName !== undefined)
            url_ += "fileName=" + encodeURIComponent("" + fileName) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlobDELETE(_response);
        });
    }

    protected processBlobDELETE(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param fileName (optional) 
     * @return Success
     */
    presignedPutObject(fileName: string | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/blob/presigned-put-object?";
        if (fileName === null)
            throw new Error("The parameter 'fileName' cannot be null.");
        else if (fileName !== undefined)
            url_ += "fileName=" + encodeURIComponent("" + fileName) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPresignedPutObject(_response);
        });
    }

    protected processPresignedPutObject(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as string;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    /**
     * @param id (optional) 
     * @param fileName (optional) 
     * @param mime (optional) 
     * @return Success
     */
    blobInformation(id: string | undefined, fileName: string | undefined, mime: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/blob/blob-information?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        if (fileName === null)
            throw new Error("The parameter 'fileName' cannot be null.");
        else if (fileName !== undefined)
            url_ += "fileName=" + encodeURIComponent("" + fileName) + "&";
        if (mime === null)
            throw new Error("The parameter 'mime' cannot be null.");
        else if (mime !== undefined)
            url_ += "mime=" + encodeURIComponent("" + mime) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlobInformation(_response);
        });
    }

    protected processBlobInformation(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param limit (optional) 
     * @param offset (optional) 
     * @return Success
     */
    companyList(limit: number | undefined, offset: number | undefined): Promise<CompanyOffsetPaginationResponse> {
        let url_ = this.baseUrl + "/api/v1/company/company-list?";
        if (limit === null)
            throw new Error("The parameter 'limit' cannot be null.");
        else if (limit !== undefined)
            url_ += "Limit=" + encodeURIComponent("" + limit) + "&";
        if (offset === null)
            throw new Error("The parameter 'offset' cannot be null.");
        else if (offset !== undefined)
            url_ += "Offset=" + encodeURIComponent("" + offset) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCompanyList(_response);
        });
    }

    protected processCompanyList(response: Response): Promise<CompanyOffsetPaginationResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as CompanyOffsetPaginationResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CompanyOffsetPaginationResponse>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    companyDetail(id: number | undefined): Promise<CompanyDataResponse> {
        let url_ = this.baseUrl + "/api/v1/company/company-detail?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCompanyDetail(_response);
        });
    }

    protected processCompanyDetail(response: Response): Promise<CompanyDataResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as CompanyDataResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CompanyDataResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    registerCompany(body: RegisterCompanyRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/company/register-company";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegisterCompany(_response);
        });
    }

    protected processRegisterCompany(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateCompany(id: string, body: UpdateCompanyRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/company/company/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdateCompany(_response);
        });
    }

    protected processUpdateCompany(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    deleteCompany(id: number | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/company/delete-company?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteCompany(_response);
        });
    }

    protected processDeleteCompany(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return Success
     */
    gate(): Promise<GetGateResponse[]> {
        let url_ = this.baseUrl + "/api/v1/gate";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGate(_response);
        });
    }

    protected processGate(response: Response): Promise<GetGateResponse[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as GetGateResponse[];
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetGateResponse[]>(null as any);
    }

    /**
     * @param limit (optional) 
     * @param offset (optional) 
     * @return Success
     */
    planeList(limit: number | undefined, offset: number | undefined): Promise<PlaneOffsetPaginationResponse> {
        let url_ = this.baseUrl + "/api/v1/plane/plane-list?";
        if (limit === null)
            throw new Error("The parameter 'limit' cannot be null.");
        else if (limit !== undefined)
            url_ += "Limit=" + encodeURIComponent("" + limit) + "&";
        if (offset === null)
            throw new Error("The parameter 'offset' cannot be null.");
        else if (offset !== undefined)
            url_ += "Offset=" + encodeURIComponent("" + offset) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlaneList(_response);
        });
    }

    protected processPlaneList(response: Response): Promise<PlaneOffsetPaginationResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PlaneOffsetPaginationResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PlaneOffsetPaginationResponse>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    planeDetail(id: number | undefined): Promise<PlaneDataResponse> {
        let url_ = this.baseUrl + "/api/v1/plane/plane-detail?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlaneDetail(_response);
        });
    }

    protected processPlaneDetail(response: Response): Promise<PlaneDataResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PlaneDataResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PlaneDataResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    registerPlane(body: RegisterPlaneRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/plane/register-plane";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegisterPlane(_response);
        });
    }

    protected processRegisterPlane(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updatePlane(id: string, body: UpdatePlaneRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/plane/plane/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdatePlane(_response);
        });
    }

    protected processUpdatePlane(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    deletePlane(id: number | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/plane/delete-plane?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeletePlane(_response);
        });
    }

    protected processDeletePlane(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return Success
     */
    planeType(): Promise<GetPlaneTypeResponse[]> {
        let url_ = this.baseUrl + "/api/v1/plane-type";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlaneType(_response);
        });
    }

    protected processPlaneType(response: Response): Promise<GetPlaneTypeResponse[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as GetPlaneTypeResponse[];
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetPlaneTypeResponse[]>(null as any);
    }

    /**
     * @param nextId (optional) 
     * @param prevId (optional) 
     * @param limit (optional) 
     * @return Success
     */
    scheduleList(nextId: number | undefined, prevId: number | undefined, limit: number | undefined): Promise<ScheduleCursorPaginationResponse> {
        let url_ = this.baseUrl + "/api/v1/schedule/schedule-list?";
        if (nextId === null)
            throw new Error("The parameter 'nextId' cannot be null.");
        else if (nextId !== undefined)
            url_ += "NextId=" + encodeURIComponent("" + nextId) + "&";
        if (prevId === null)
            throw new Error("The parameter 'prevId' cannot be null.");
        else if (prevId !== undefined)
            url_ += "PrevId=" + encodeURIComponent("" + prevId) + "&";
        if (limit === null)
            throw new Error("The parameter 'limit' cannot be null.");
        else if (limit !== undefined)
            url_ += "Limit=" + encodeURIComponent("" + limit) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processScheduleList(_response);
        });
    }

    protected processScheduleList(response: Response): Promise<ScheduleCursorPaginationResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ScheduleCursorPaginationResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ScheduleCursorPaginationResponse>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    scheduleDetail(id: number | undefined): Promise<ScheduleDataResponse> {
        let url_ = this.baseUrl + "/api/v1/schedule/schedule-detail?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processScheduleDetail(_response);
        });
    }

    protected processScheduleDetail(response: Response): Promise<ScheduleDataResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ScheduleDataResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ScheduleDataResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    registerSchedule(body: RegisterScheduleRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/schedule/register-schedule";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegisterSchedule(_response);
        });
    }

    protected processRegisterSchedule(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateSchedule(id: string, body: UpdateScheduleRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/schedule/schedule/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdateSchedule(_response);
        });
    }

    protected processUpdateSchedule(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    deleteSchedule(id: number | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v1/schedule/delete-schedule?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteSchedule(_response);
        });
    }

    protected processDeleteSchedule(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }
}

export interface CompanyDataResponse {
    id?: number;
    name?: string | undefined;
    address?: string | undefined;
    phone?: string | undefined;
    blobId?: string | undefined;
    fileName?: string | undefined;
    fileUrl?: string | undefined;
}

export interface CompanyOffsetPaginationResponse {
    companies?: CompanyDataResponse[] | undefined;
    totalData?: number;
}

export interface GetGateResponse {
    id?: number;
    name?: string | undefined;
}

export interface GetPlaneTypeResponse {
    id?: number;
    name?: string | undefined;
}

export interface PlaneDataResponse {
    id?: number;
    name?: string | undefined;
    companyId?: number;
    companyAddress?: string | undefined;
    planeTypeId?: number;
    type?: string | undefined;
    capacity?: number;
    fuelCapacity?: number;
}

export interface PlaneOffsetPaginationResponse {
    planes?: PlaneDataResponse[] | undefined;
    totalData?: number;
}

export interface RegisterCompanyRequest {
    name?: string | undefined;
    address?: string | undefined;
    phone?: string | undefined;
    blobId?: string;
}

export interface RegisterPlaneRequest {
    name?: string | undefined;
    companyId?: number;
    planeTypeId?: number;
    capacity?: number;
    fuelCapacity?: number;
}

export interface RegisterScheduleRequest {
    planeId?: number;
    gateId?: number;
    departure?: string | undefined;
    arrival?: string | undefined;
    departureDate?: Date;
    arrivalDate?: Date;
    distance?: number;
}

export interface ScheduleCursorPaginationResponse {
    schedules?: ScheduleDataResponse[] | undefined;
    nextCursor?: string | undefined;
    prevCursor?: string | undefined;
}

export interface ScheduleDataResponse {
    id?: number;
    planeId?: number;
    planeName?: string | undefined;
    companyName?: string | undefined;
    departure?: string | undefined;
    arrival?: string | undefined;
    planeCapacity?: number;
    departureDate?: Date;
    arrivalDate?: Date;
    gateId?: number;
    gateName?: string | undefined;
    distance?: number;
}

export interface UpdateCompanyRequest {
    id?: number;
    name?: string | undefined;
    address?: string | undefined;
    phone?: string | undefined;
    blobId?: string;
}

export interface UpdatePlaneRequest {
    id?: number;
    name?: string | undefined;
    companyId?: number;
    planeTypeId?: number;
    capacity?: number;
    fuelCapacity?: number;
}

export interface UpdateScheduleRequest {
    id?: number;
    planeId?: number;
    gateId?: number;
    departure?: string | undefined;
    arrival?: string | undefined;
    departureDate?: Date;
    arrivalDate?: Date;
    distance?: number;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}