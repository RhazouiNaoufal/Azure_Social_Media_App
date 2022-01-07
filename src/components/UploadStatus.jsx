import React from "react";


/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */

export const UploadStatus = (props) => {
    return (
        <>
        <div className="container">
                <div className="row align-items-start">
                    <div className="col-2" />
                    <div className="col-8" style={{textAlign: 'center'}}>
                        <h3>Translate Your Status</h3>
                    </div>
                    <div className="col-2" />
                    </div>
                    <div className="row align-items-start">
                    <div className="col-2" />
                    <div className="col-8" style={{textAlign: 'left', borderBottom: '1px solid #222222'}}>
                        <p>Status Translator</p>
                        <form style={{fontSize: '10pt'}} id="TranslateForm">
                        <div className="mb-3">
                            <label htmlFor="Translation" className="form-label">Please Enter Text to be Translated</label>
                            <input type="text" className="form-control" id="Translation" />
                        </div>
                        <div>
                            <label for="translateFrom">Translate From</label>
                            <select name="translateFrom" id="translateFrom"
                                    class="form-control w-full border border-gray-300
                                    rounded-lg shadow-sm" placeholder="">
                                <option value="en">English</option>    
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                                <option value="ru">Russian</option>
                                <option value="pl">Polish</option>
                                <option value="ja">Japanese</option>
                                <option value="it">Italian</option>
                                <option value="fr">French</option>
                                <option value="zh">Chinese</option>
                            </select>
                        </div>
                        <div>
                            <label for="translateTo">Translate To</label>
                            <select name="translateTo" id="translateTo"
                                    class="form-control w-full border border-gray-300
                                    rounded-lg shadow-sm" placeholder="">
                                <option value="en">English</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                                <option value="ru">Russian</option>
                                <option value="pl">Polish</option>
                                <option value="ja">Japanese</option>
                                <option value="it">Italian</option>
                                <option value="fr">French</option>
                                <option value="zh">Chinese</option>
                            </select>
                        </div>
                        <button type="button" id="translate" className="btn btn-primary">Post</button> <br /><br />
                        </form>
                    </div>
                    <div className="col-2" />
                    </div>
                        <div className="row align-items-start">
                            <div className="col-2" />
                                <div className="col-8" style={{textAlign: 'left'}}>
                                    <div id="ShowTranslation">
                                    </div>
                                </div>
                            <div className="col-2" />
                    </div>
            </div>
            {props.children}
        </>
    );
};  