import { useState } from 'react';
import axios from '../lib/axios';

export default function useForm(initialValues = {}) {
    const [data, setInternalData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const setData = (keyOrData, value) => {
        if (typeof keyOrData === 'string') {
            setInternalData((prev) => ({ ...prev, [keyOrData]: value }));
        } else {
            setInternalData((prev) => ({ ...prev, ...keyOrData }));
        }
    };

    const reset = (...fields) => {
        if (fields.length === 0) {
            setInternalData(initialValues);
        } else {
            const resetData = { ...data };
            fields.forEach((field) => {
                if (field in initialValues) {
                    resetData[field] = initialValues[field];
                }
            });
            setInternalData(resetData);
        }
    };

    const clearErrors = (...fields) => {
        if (fields.length === 0) {
            setErrors({});
        } else {
            const newErrors = { ...errors };
            fields.forEach((field) => delete newErrors[field]);
            setErrors(newErrors);
        }
    };

    const submit = async (method, url, options = {}) => {
        setProcessing(true);
        setWasSuccessful(false);
        setRecentlySuccessful(false);
        
        // Limpiamos errores previos en cada envío
        if (!options.preserveErrors) {
            clearErrors();
        }

        try {
            let requestData = data;
            let isFormData = false;

            // Verificar si hay algún archivo en los datos
            const hasFiles = Object.values(data).some(
                (val) => val instanceof File || val instanceof Blob
            );

            if (hasFiles && method.toLowerCase() !== 'get') {
                isFormData = true;
                const formData = new FormData();
                for (const key in data) {
                    if (data[key] !== null && data[key] !== undefined) {
                        formData.append(key, data[key]);
                    }
                }
                if (method.toLowerCase() === 'put' || method.toLowerCase() === 'patch') {
                    formData.append('_method', method.toUpperCase());
                    method = 'post'; // Laravel requires POST with _method spoofing for FormData PUT/PATCH
                }
                requestData = formData;
            }

            const response = await axios({
                method,
                url,
                data: method.toLowerCase() === 'get' ? undefined : requestData,
                params: method.toLowerCase() === 'get' ? data : undefined,
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
                ...options.axiosConfig // Por si queremos pasar configuraciones extra como headers
            });

            setWasSuccessful(true);
            setRecentlySuccessful(true);
            setTimeout(() => setRecentlySuccessful(false), 2000);

            if (options.onSuccess) {
                options.onSuccess(response.data);
            }
        } catch (error) {
            setWasSuccessful(false);
            if (error.response?.status === 422) {
                // Errores de validación de Laravel
                const validationErrors = error.response.data.errors || {};
                // Laravel devuelve { email: ["El email es inválido"] }, Inertia usa el primer error: { email: "El email es inválido" }
                const formattedErrors = {};
                for (const key in validationErrors) {
                    formattedErrors[key] = validationErrors[key][0];
                }
                setErrors(formattedErrors);
                if (options.onError) {
                    options.onError(formattedErrors);
                }
            } else {
                if (options.onError) {
                    options.onError(error);
                }
                console.error("useForm Request Error:", error);
            }
        } finally {
            setProcessing(false);
            if (options.onFinish) {
                options.onFinish();
            }
        }
    };

    const post = (url, options) => submit('post', url, options);
    const put = (url, options) => submit('put', url, options);
    const patch = (url, options) => submit('patch', url, options);
    const destroy = (url, options) => submit('delete', url, options);
    const get = (url, options) => submit('get', url, options);

    return {
        data,
        setData,
        post,
        put,
        patch,
        delete: destroy,
        get,
        processing,
        errors,
        reset,
        clearErrors,
        wasSuccessful,
        recentlySuccessful,
    };
}
