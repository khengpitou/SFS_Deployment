import axios from "axios";
import { useEffect, useState, useCallback } from "react";

// axios.defaults.withCredentials = true;

const instance = axios.create({
    withCredentials: true,
});

const url = "http://localhost:8080/api/v1/";

export const postAPI = async (uri, body, header = true) =>
{
    const response = await instance
        .post(url + uri, body, {
            headers: {},
        })
        .then((res) =>
        {
            return res?.data;
        })
        .catch((e) =>
        {
            if (window.location.pathname === "/login")
            {
                throw e?.response?.data?.error?.message?.value;
            }

            if (e?.response?.status === 401)
            {
                window.location.href = "/login";
                throw e?.response?.data?.error?.message?.value;
            }
            throw e?.response?.data?.error?.message?.value;
        });

    return response;
};

export const fetchFromAPI = async (uri, header) =>
{
    const response = await instance
        .get(url + uri, header)
        .then((res) => res.data)
        .catch((e) =>
        {

            if (window.location.pathname === "/login")
            {

                throw e?.response?.data?.error?.message?.value;
            }

            if (e?.response?.status === 401)
            {
                window.location.href = "/login";
                throw e?.response?.data?.error?.message?.value;
            }

            throw e?.response?.data?.error?.message?.value;
        });

    return response;
};

export const patchAPI = async (uri, body, header = true) =>
{
    const response = await instance
        .patch(url + uri, body, {
            headers: {},
        })
        .then((res) =>
        {

            return res?.data;
        })
        .catch((e) =>
        {

            if (window.location.pathname === "/login")
            {
                throw e?.response?.data?.error?.message?.value;
            }

            if (e?.response?.status === 401)
            {
                window.location.href = "/login";
                throw e?.response?.data?.error?.message?.value;
            }
            throw e?.response?.data?.error?.message?.value;
        });

    return response;
};
export const deleteAPI = async (uri, body, header = true) =>
{
    const response = await instance
        .delete(url + uri)
        .then((res) => res.data)
        .catch((e) =>
        {

            if (window.location.pathname === "/login")
            {

                throw e?.response?.data?.error?.message?.value;
            }

            if (e?.response?.status === 401)
            {
                window.location.href = "/login";
                throw e?.response?.data?.error?.message?.value;
            }

            throw e?.response?.data?.error?.message?.value;
        });

    return response;
};

export const FetchAPIFromServer = async (uri) =>
{
    const [error, seterror] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        (async function ()
        {
            try
            {
                setLoading(true);
                await instance
                    .get(url + uri)
                    .then((res) =>
                    {

                        setData(res.data);
                    })
                    .catch((e) =>
                    {
                        if (e?.response?.status === 401)
                        {
                            window.location.href = "/login";
                        }
                        seterror(e?.response?.data?.error?.message?.value);
                    });
            } catch (err)
            {

                seterror(err);
            } finally
            {
                setLoading(false);
            }
        })();
    }, [uri]);

    return { error, data, loading };
};

const usePostRequest = ({ uri, payload }) =>
{
    const [res, setRes] = useState({ data: null, error: null, isLoading: false });
    // You POST method here
    const callAPI = useCallback(() =>
    {
        setRes((prevState) => ({ ...prevState, isLoading: true }));
        axios
            .post(url + uri, payload)
            .then((res) =>
            {
                setRes({ data: res.data, isLoading: false, error: null });
            })
            .catch((error) =>
            {
                setRes({ data: null, isLoading: false, error });
            });
    }, [uri, payload]);
    return [res, callAPI];
};

