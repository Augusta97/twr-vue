e<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header></admin-header>
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li
              class="breadcrumb-item active"
              aria-current="page"
              v-if="$route.params.view === 'view'"
            >View Media</li>
            <li class="breadcrumb-item active" aria-current="page" v-else>Edit Media</li>
          </ol>
        </div>
        <div>
          <b-form class="grpbg" enctype="multipart/form-data" @submit.prevent="editMedia">
            <b-row>
              <b-form-group class="col-sm-12">
                <h5 v-if="$route.params.view === 'view'">View Media</h5>
                <h5 v-else>Edit Media</h5>
              </b-form-group>
            </b-row>
            <b-row v-if="$route.params.view === 'view'">
              <b-col sm="9" class="marginTop">
                <b-form-group class="col-sm-12">
                  <label for="title">Title</label>
                  <b-form-input
                    type="text"
                    name="title"
                    v-model="formData.title"
                    id="title"
                    class="form-control"
                    :class="{ 'is-danger': errors.has('title') }"
                    readonly
                  />
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="content">Description</label>
                  <editor-menu-bar :editor="formData.content" v-slot="{ commands, isActive }">
                    <div class="menubar">
                      <div class="toolbar">
                        <a class="menubar__button" @click="commands.undo">
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--undo">
                              <path
                                d="M17.786 3.77a12.542 12.542 0 00-12.965-.865.249.249 0 01-.292-.045L1.937.269A.507.507 0 001.392.16a.5.5 0 00-.308.462v6.7a.5.5 0 00.5.5h6.7a.5.5 0 00.354-.854L6.783 5.115a.253.253 0 01-.068-.228.249.249 0 01.152-.181 10 10 0 019.466 1.1 9.759 9.759 0 01.094 15.809 1.25 1.25 0 001.473 2.016 12.122 12.122 0 005.013-9.961 12.125 12.125 0 00-5.127-9.9z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a class="menubar__button" @click="commands.redo">
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--redo">
                              <path
                                d="M22.608.161a.5.5 0 00-.545.108L19.472 2.86a.25.25 0 01-.292.045 12.537 12.537 0 00-12.966.865A12.259 12.259 0 006.1 23.632a1.25 1.25 0 001.476-2.018 9.759 9.759 0 01.091-15.809 10 10 0 019.466-1.1.25.25 0 01.084.409l-1.85 1.85a.5.5 0 00.354.853h6.7a.5.5 0 00.5-.5V.623a.5.5 0 00-.313-.462z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.bold() }"
                          @click="commands.bold"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--bold">
                              <path
                                d="M17.194 10.962A6.271 6.271 0 0012.844.248H4.3a1.25 1.25 0 000 2.5h1.013a.25.25 0 01.25.25V21a.25.25 0 01-.25.25H4.3a1.25 1.25 0 100 2.5h9.963a6.742 6.742 0 002.93-12.786zm-4.35-8.214a3.762 3.762 0 010 7.523H8.313a.25.25 0 01-.25-.25V3a.25.25 0 01.25-.25zm1.42 18.5H8.313a.25.25 0 01-.25-.25v-7.977a.25.25 0 01.25-.25h5.951a4.239 4.239 0 010 8.477z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.italic() }"
                          @click="commands.italic"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--italic">
                              <path
                                d="M22.5.248h-7.637a1.25 1.25 0 000 2.5h1.086a.25.25 0 01.211.384L4.78 21.017a.5.5 0 01-.422.231H1.5a1.25 1.25 0 000 2.5h7.637a1.25 1.25 0 000-2.5H8.051a.25.25 0 01-.211-.384L19.22 2.98a.5.5 0 01.422-.232H22.5a1.25 1.25 0 000-2.5z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.strike() }"
                          @click="commands.strike"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--strike">
                              <path
                                d="M23.75 12.952A1.25 1.25 0 0022.5 11.7h-8.936a.492.492 0 01-.282-.09c-.722-.513-1.482-.981-2.218-1.432-2.8-1.715-4.5-2.9-4.5-4.863 0-2.235 2.207-2.569 3.523-2.569a4.54 4.54 0 013.081.764 2.662 2.662 0 01.447 1.99v.3a1.25 1.25 0 102.5 0v-.268a4.887 4.887 0 00-1.165-3.777C13.949.741 12.359.248 10.091.248c-3.658 0-6.023 1.989-6.023 5.069 0 2.773 1.892 4.512 4 5.927a.25.25 0 01-.139.458H1.5a1.25 1.25 0 000 2.5h10.977a.251.251 0 01.159.058 4.339 4.339 0 011.932 3.466c0 3.268-3.426 3.522-4.477 3.522-1.814 0-3.139-.405-3.834-1.173a3.394 3.394 0 01-.65-2.7 1.25 1.25 0 00-2.488-.246A5.76 5.76 0 004.4 21.753c1.2 1.324 3.114 2 5.688 2 4.174 0 6.977-2.42 6.977-6.022a6.059 6.059 0 00-.849-3.147.25.25 0 01.216-.377H22.5a1.25 1.25 0 001.25-1.255z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.underline() }"
                          @click="commands.underline"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--underline">
                              <path
                                d="M22.5 21.248h-21a1.25 1.25 0 000 2.5h21a1.25 1.25 0 000-2.5zM1.978 2.748h1.363a.25.25 0 01.25.25v8.523a8.409 8.409 0 0016.818 0V3a.25.25 0 01.25-.25h1.363a1.25 1.25 0 000-2.5H16.3a1.25 1.25 0 000 2.5h1.363a.25.25 0 01.25.25v8.523a5.909 5.909 0 01-11.818 0V3a.25.25 0 01.25-.25H7.7a1.25 1.25 0 100-2.5H1.978a1.25 1.25 0 000 2.5z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.paragraph() }"
                          @click="commands.paragraph"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--paragraph">
                              <path
                                d="M22.5.248H7.228a6.977 6.977 0 100 13.954h2.318a.25.25 0 01.25.25V22.5a1.25 1.25 0 002.5 0V3a.25.25 0 01.25-.25h3.682a.25.25 0 01.25.25v19.5a1.25 1.25 0 002.5 0V3a.249.249 0 01.25-.25H22.5a1.25 1.25 0 000-2.5zM9.8 11.452a.25.25 0 01-.25.25H7.228a4.477 4.477 0 110-8.954h2.318A.25.25 0 019.8 3z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                          @click="commands.heading({ level: 1 })"
                        >H1</a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                          @click="commands.heading({ level: 2 })"
                        >H2</a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                          @click="commands.heading({ level: 3 })"
                        >H3</a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.bullet_list() }"
                          @click="commands.bullet_list"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--ul">
                              <circle cx="2.5" cy="3.998" r="2.5" />
                              <path d="M8.5 5H23a1 1 0 000-2H8.5a1 1 0 000 2z" />
                              <circle cx="2.5" cy="11.998" r="2.5" />
                              <path d="M23 11H8.5a1 1 0 000 2H23a1 1 0 000-2z" />
                              <circle cx="2.5" cy="19.998" r="2.5" />
                              <path d="M23 19H8.5a1 1 0 000 2H23a1 1 0 000-2z" />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.ordered_list() }"
                          @click="commands.ordered_list"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--ol">
                              <path
                                d="M7.75 4.5h15a1 1 0 000-2h-15a1 1 0 000 2zm15 6.5h-15a1 1 0 100 2h15a1 1 0 000-2zm0 8.5h-15a1 1 0 000 2h15a1 1 0 000-2zM2.212 17.248a2 2 0 00-1.933 1.484.75.75 0 101.45.386.5.5 0 11.483.63.75.75 0 100 1.5.5.5 0 11-.482.635.75.75 0 10-1.445.4 2 2 0 103.589-1.648.251.251 0 010-.278 2 2 0 00-1.662-3.111zm2.038-6.5a2 2 0 00-4 0 .75.75 0 001.5 0 .5.5 0 011 0 1.031 1.031 0 01-.227.645L.414 14.029A.75.75 0 001 15.248h2.5a.75.75 0 000-1.5h-.419a.249.249 0 01-.195-.406L3.7 12.33a2.544 2.544 0 00.55-1.582zM4 5.248h-.25A.25.25 0 013.5 5V1.623A1.377 1.377 0 002.125.248H1.5a.75.75 0 000 1.5h.25A.25.25 0 012 2v3a.25.25 0 01-.25.25H1.5a.75.75 0 000 1.5H4a.75.75 0 000-1.5z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.blockquote() }"
                          @click="commands.blockquote"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--quote">
                              <path
                                d="M18.559 3.932a4.942 4.942 0 100 9.883 4.609 4.609 0 001.115-.141.25.25 0 01.276.368 6.83 6.83 0 01-5.878 3.523 1.25 1.25 0 000 2.5 9.71 9.71 0 009.428-9.95V8.873a4.947 4.947 0 00-4.941-4.941zm-12.323 0a4.942 4.942 0 000 9.883 4.6 4.6 0 001.115-.141.25.25 0 01.277.368 6.83 6.83 0 01-5.878 3.523 1.25 1.25 0 000 2.5 9.711 9.711 0 009.428-9.95V8.873a4.947 4.947 0 00-4.942-4.941z"
                              />
                            </svg>
                          </div>
                        </a>
                        <a class="menubar__button" @click="showImagePrompt(commands.image)">
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--image">
                              <circle cx="9.75" cy="6.247" r="2.25" />
                              <path
                                d="M16.916 8.71A1.027 1.027 0 0016 8.158a1.007 1.007 0 00-.892.586l-1.558 3.434a.249.249 0 01-.422.053l-.82-1.024a1 1 0 00-.813-.376 1.007 1.007 0 00-.787.426L7.59 15.71a.5.5 0 00.41.79h12a.5.5 0 00.425-.237.5.5 0 00.022-.486z"
                              />
                              <path
                                d="M22 0H5.5a2 2 0 00-2 2v16.5a2 2 0 002 2H22a2 2 0 002-2V2a2 2 0 00-2-2zm-.145 18.354a.5.5 0 01-.354.146H6a.5.5 0 01-.5-.5V2.5A.5.5 0 016 2h15.5a.5.5 0 01.5.5V18a.5.5 0 01-.145.351z"
                              />
                              <path
                                d="M19.5 22h-17a.5.5 0 01-.5-.5v-17a1 1 0 00-2 0V22a2 2 0 002 2h17.5a1 1 0 000-2z"
                              />
                            </svg>
                          </div>
                        </a>
                        <a
                          class="menubar__button"
                          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--table">
                              <path
                                fill-rule="evenodd"
                                d="M17 17v5h2a3 3 0 003-3v-2h-5zm-2 0H9v5h6v-5zm2-2h5V9h-5v6zm-2 0V9H9v6h6zm2-8h5V5a3 3 0 00-3-3h-2v5zm-2 0V2H9v5h6zm9 9.177V19a5 5 0 01-5 5H5a5 5 0 01-5-5V5a5 5 0 015-5h14a5 5 0 015 5v2.823a.843.843 0 010 .354v7.646a.843.843 0 010 .354zM7 2H5a3 3 0 00-3 3v2h5V2zM2 9v6h5V9H2zm0 8v2a3 3 0 003 3h2v-5H2z"
                              />
                            </svg>
                          </div>
                        </a>

                        <span v-if="isActive.table()">
                          <a class="menubar__button" @click="commands.deleteTable">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--delete_table">
                                <path
                                  d="M19 14a5 5 0 110 10 5 5 0 010-10zm-2.5 5.938h5a.937.937 0 100-1.875h-5a.937.937 0 100 1.875zM12.29 17H9v5h3.674c.356.75.841 1.426 1.427 2H5a5 5 0 01-5-5V5a5 5 0 015-5h14a5 5 0 015 5v2.823a.843.843 0 010 .354V14.1a7.018 7.018 0 00-2-1.427V9h-5v3.29a6.972 6.972 0 00-2 .965V9H9v6h4.255a6.972 6.972 0 00-.965 2zM17 7h5V5a3 3 0 00-3-3h-2v5zm-2 0V2H9v5h6zM7 2H5a3 3 0 00-3 3v2h5V2zM2 9v6h5V9H2zm0 8v2a3 3 0 003 3h2v-5H2z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addColumnBefore">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_col_before">
                                <path
                                  d="M19 14a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875h-1.25a.312.312 0 01-.313-.313V16.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 101.875 0v-1.25c0-.173.14-.313.312-.313h1.25zM2 19a3 3 0 006 0V5a3 3 0 10-6 0v14zm-2 0V5a5 5 0 1110 0v14a5 5 0 01-10 0z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addColumnAfter">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_col_after">
                                <path
                                  d="M5 14a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875H6.25a.312.312 0 01-.313-.313V16.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H2.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 101.875 0v-1.25c0-.173.14-.313.312-.313H7.5zM16 19a3 3 0 006 0V5a3 3 0 00-6 0v14zm-2 0V5a5 5 0 0110 0v14a5 5 0 01-10 0z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.deleteColumn">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--delete_col">
                                <path
                                  d="M12.641 21.931a7.01 7.01 0 001.146 1.74A5 5 0 017 19V5a5 5 0 1110 0v7.29a6.972 6.972 0 00-2 .965V5a3 3 0 00-6 0v14a3 3 0 003.641 2.931zM19 14a5 5 0 110 10 5 5 0 010-10zm-2.5 5.938h5a.937.937 0 100-1.875h-5a.937.937 0 100 1.875z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addRowBefore">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_row_before">
                                <path
                                  d="M19 14a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875h-1.25a.312.312 0 01-.313-.313V16.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 101.875 0v-1.25c0-.173.14-.313.312-.313h1.25zM5 2a3 3 0 100 6h14a3 3 0 000-6H5zm0-2h14a5 5 0 010 10H5A5 5 0 115 0z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addRowAfter">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_row_after">
                                <path
                                  d="M19 0a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875h-1.25a.312.312 0 01-.313-.313V2.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312V7.5a.937.937 0 101.875 0V6.25c0-.173.14-.313.312-.313h1.25zM5 16a3 3 0 000 6h14a3 3 0 000-6H5zm0-2h14a5 5 0 010 10H5a5 5 0 010-10z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.deleteRow">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--delete_row">
                                <path
                                  d="M13.255 15a6.972 6.972 0 00-.965 2H5A5 5 0 015 7h14a5 5 0 014.671 6.787 7.01 7.01 0 00-1.74-1.146A3 3 0 0019 9H5a3 3 0 000 6h8.255zM19 14a5 5 0 110 10 5 5 0 010-10zm-2.5 5.938h5a.937.937 0 100-1.875h-5a.937.937 0 100 1.875z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.toggleCellMerge">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--combine_cells">
                                <path
                                  d="M2 19a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3H5a3 3 0 00-3 3v14zm-2 0V5a5 5 0 015-5h14a5 5 0 015 5v14a5 5 0 01-5 5H5a5 5 0 01-5-5zm12-9a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm0 6a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1zm0-13a1 1 0 011 1v3a1 1 0 01-2 0V4a1 1 0 011-1z"
                                />
                              </svg>
                            </div>
                          </a>
                        </span>
                      </div>
                    </div>
                  </editor-menu-bar>
                  <br />
                  <editor-content
                    class="editor__content form-group"
                    :editor="formData.content"
                    style="border: 1px solid #ced4da;padding: 0.375rem 0.75rem;border-radius: 0.25rem;background-color: #e9ecef;opacity: 1;pointer-events: none;"
                  />
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="excerpt">Excerpt</label>
                  <b-form-textarea
                    type="text"
                    name="excerpt"
                    v-model="formData.excerpt"
                    id="excerpt"
                    class="form-control"
                    readonly
                  />
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="file" class="mt-3">Banner Image</label>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      :src="formData.bannerImageUrl"
                      fluid
                      alt="Fluid image"
                      class="img-thumbnail tick1"
                    ></b-img>
                  </div>
                </b-form-group>

                <b-form-group class="col-sm-12 audiohit">
                  <label for="file">Audio</label>
                  <b-embed type="audio" controls class="audiocls bg-iavt bgcards">
                    <source :src="formData.audioUrl" type="audio/webm" />
                    <source :src="formData.audioUrl" type="audio/mp3" />
                  </b-embed>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="video">Video</label>
                  <b-embed type="video" controls class="audiocls bg-iavt bgcards mt-3">
                    <source :src="formData.videoUrl" type="video/webm" />
                    <source :src="formData.videoUrl" type="video/mp4" />
                  </b-embed>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="pdf">PDF</label>
                  <div>
                    <button type="button" class="btn btn-warning mt-3" v-if="formData.pdfUrl != ''">
                      <a :href="formData.pdfUrl" class="clr-red">
                        <i class="fas fa-file-pdf">
                          <span class="ml-2">Download</span>
                        </i>
                      </a>
                    </button>
                    <p v-else>No pdf file exist</p>
                  </div>
                  <!-- <iframe :src="formData.pdf" width="600px" height="500px" /> -->
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-row>
                  <b-form-group label="Parent" label-for="parentId" class="col-sm-12">
                    <b-form-select
                      v-model="formData.parentId"
                      v-validate="'required'"
                      name="parentId"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('parentId') }"
                      disabled
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="0">None</option>
                      <option
                        v-for="(eve, index) in allMedia.row"
                        :key="index"
                        :value="eve.ID"
                      >{{ eve.title }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('parentId')"
                      class="help is-danger"
                    >{{ errors.first('parentId') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <label class="col-sm-12 form-group">Show Child</label>
                  <b-col sm="6" class="radio">
                    <b-form-radio
                      type="radio"
                      v-model="formData.showChild"
                      name="showChild"
                      v-validate="'required|included:1,0'"
                      value="1"
                      class="checkx"
                      disabled
                    >
                      <span class="check-paddleft">Yes</span>
                    </b-form-radio>
                  </b-col>
                  <b-col sm="6" class="radio">
                    <b-form-radio
                      type="radio"
                      v-model="formData.showChild"
                      name="showChild"
                      value="0"
                      class="checkx"
                      disabled
                    >
                      <span class="check-paddleft">No</span>
                    </b-form-radio>
                  </b-col>
                  <b-col>
                    <span
                      v-show="errors.has('showChild')"
                      class="help is-danger"
                    >{{ errors.first('showChild') }}</span>
                  </b-col>
                  <br />
                </b-row>
                <b-row>
                  <b-form-group label="Status" label-for="status" class="col-sm-12">
                    <b-form-select
                      v-model="formData.status"
                      v-validate="'required'"
                      name="status"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('status') }"
                      disabled
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="Published">Published</option>
                      <option value="Private">Private</option>
                      <option value="Draft">Draft</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('status')"
                      class="help is-danger"
                    >{{ errors.first('status') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Language" label-for="language" class="col-sm-12">
                    <b-form-select
                      v-model="formData.language"
                      v-validate="'required'"
                      name="language"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('language') }"
                      disabled
                    >
                      <option class="disable" disabled value>Select</option>
                      <option
                        v-for="(lang, index) in existinglang.rows"
                        :key="index"
                        :value="lang.langId"
                      >{{ lang.OriginalLangtext }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('language')"
                      class="help is-danger"
                    >{{ errors.first('language') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Classification" label-for="Classification" class="col-sm-12">
                    <b-form-select
                      v-model="formData.mediaClassification"
                      v-validate="'required'"
                      name="mediaClassification"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('mediaClassification') }"
                      disabled
                    >
                      <option value="0">None</option>
                      <option
                        v-for="(med, index) in mediaType"
                        :key="index"
                        :value="med.mediaClassifyId"
                      >{{ med.mediaClassifyName }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('mediaClassification')"
                      class="help is-danger"
                    >{{ errors.first('mediaClassification') }}</span>
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <b-row v-else>
              <b-col sm="9" class="marginTop">
                <b-form-group class="col-sm-12">
                  <label for="title">Title</label>
                  <b-form-input
                    type="text"
                    name="title"
                    v-model="formData.title"
                    id="title"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('title') }"
                    v-on:keyup="titleCheck"
                  />
                  <span v-show="errors.has('title')" class="help is-danger">
                    {{
                    errors.first("title")
                    }}
                  </span>
                  <span class="help is-danger" v-if="titleExists">Already Exists</span>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="content">Description</label>
                  <editor-menu-bar :editor="formData.content" v-slot="{ commands, isActive }">
                    <div class="menubar">
                      <div class="toolbar">
                        <a class="menubar__button" @click="commands.undo">
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--undo">
                              <path
                                d="M17.786 3.77a12.542 12.542 0 00-12.965-.865.249.249 0 01-.292-.045L1.937.269A.507.507 0 001.392.16a.5.5 0 00-.308.462v6.7a.5.5 0 00.5.5h6.7a.5.5 0 00.354-.854L6.783 5.115a.253.253 0 01-.068-.228.249.249 0 01.152-.181 10 10 0 019.466 1.1 9.759 9.759 0 01.094 15.809 1.25 1.25 0 001.473 2.016 12.122 12.122 0 005.013-9.961 12.125 12.125 0 00-5.127-9.9z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a class="menubar__button" @click="commands.redo">
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--redo">
                              <path
                                d="M22.608.161a.5.5 0 00-.545.108L19.472 2.86a.25.25 0 01-.292.045 12.537 12.537 0 00-12.966.865A12.259 12.259 0 006.1 23.632a1.25 1.25 0 001.476-2.018 9.759 9.759 0 01.091-15.809 10 10 0 019.466-1.1.25.25 0 01.084.409l-1.85 1.85a.5.5 0 00.354.853h6.7a.5.5 0 00.5-.5V.623a.5.5 0 00-.313-.462z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.bold() }"
                          @click="commands.bold"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--bold">
                              <path
                                d="M17.194 10.962A6.271 6.271 0 0012.844.248H4.3a1.25 1.25 0 000 2.5h1.013a.25.25 0 01.25.25V21a.25.25 0 01-.25.25H4.3a1.25 1.25 0 100 2.5h9.963a6.742 6.742 0 002.93-12.786zm-4.35-8.214a3.762 3.762 0 010 7.523H8.313a.25.25 0 01-.25-.25V3a.25.25 0 01.25-.25zm1.42 18.5H8.313a.25.25 0 01-.25-.25v-7.977a.25.25 0 01.25-.25h5.951a4.239 4.239 0 010 8.477z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.italic() }"
                          @click="commands.italic"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--italic">
                              <path
                                d="M22.5.248h-7.637a1.25 1.25 0 000 2.5h1.086a.25.25 0 01.211.384L4.78 21.017a.5.5 0 01-.422.231H1.5a1.25 1.25 0 000 2.5h7.637a1.25 1.25 0 000-2.5H8.051a.25.25 0 01-.211-.384L19.22 2.98a.5.5 0 01.422-.232H22.5a1.25 1.25 0 000-2.5z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.strike() }"
                          @click="commands.strike"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--strike">
                              <path
                                d="M23.75 12.952A1.25 1.25 0 0022.5 11.7h-8.936a.492.492 0 01-.282-.09c-.722-.513-1.482-.981-2.218-1.432-2.8-1.715-4.5-2.9-4.5-4.863 0-2.235 2.207-2.569 3.523-2.569a4.54 4.54 0 013.081.764 2.662 2.662 0 01.447 1.99v.3a1.25 1.25 0 102.5 0v-.268a4.887 4.887 0 00-1.165-3.777C13.949.741 12.359.248 10.091.248c-3.658 0-6.023 1.989-6.023 5.069 0 2.773 1.892 4.512 4 5.927a.25.25 0 01-.139.458H1.5a1.25 1.25 0 000 2.5h10.977a.251.251 0 01.159.058 4.339 4.339 0 011.932 3.466c0 3.268-3.426 3.522-4.477 3.522-1.814 0-3.139-.405-3.834-1.173a3.394 3.394 0 01-.65-2.7 1.25 1.25 0 00-2.488-.246A5.76 5.76 0 004.4 21.753c1.2 1.324 3.114 2 5.688 2 4.174 0 6.977-2.42 6.977-6.022a6.059 6.059 0 00-.849-3.147.25.25 0 01.216-.377H22.5a1.25 1.25 0 001.25-1.255z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.underline() }"
                          @click="commands.underline"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--underline">
                              <path
                                d="M22.5 21.248h-21a1.25 1.25 0 000 2.5h21a1.25 1.25 0 000-2.5zM1.978 2.748h1.363a.25.25 0 01.25.25v8.523a8.409 8.409 0 0016.818 0V3a.25.25 0 01.25-.25h1.363a1.25 1.25 0 000-2.5H16.3a1.25 1.25 0 000 2.5h1.363a.25.25 0 01.25.25v8.523a5.909 5.909 0 01-11.818 0V3a.25.25 0 01.25-.25H7.7a1.25 1.25 0 100-2.5H1.978a1.25 1.25 0 000 2.5z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.paragraph() }"
                          @click="commands.paragraph"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--paragraph">
                              <path
                                d="M22.5.248H7.228a6.977 6.977 0 100 13.954h2.318a.25.25 0 01.25.25V22.5a1.25 1.25 0 002.5 0V3a.25.25 0 01.25-.25h3.682a.25.25 0 01.25.25v19.5a1.25 1.25 0 002.5 0V3a.249.249 0 01.25-.25H22.5a1.25 1.25 0 000-2.5zM9.8 11.452a.25.25 0 01-.25.25H7.228a4.477 4.477 0 110-8.954h2.318A.25.25 0 019.8 3z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                          @click="commands.heading({ level: 1 })"
                        >H1</a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                          @click="commands.heading({ level: 2 })"
                        >H2</a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                          @click="commands.heading({ level: 3 })"
                        >H3</a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.bullet_list() }"
                          @click="commands.bullet_list"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--ul">
                              <circle cx="2.5" cy="3.998" r="2.5" />
                              <path d="M8.5 5H23a1 1 0 000-2H8.5a1 1 0 000 2z" />
                              <circle cx="2.5" cy="11.998" r="2.5" />
                              <path d="M23 11H8.5a1 1 0 000 2H23a1 1 0 000-2z" />
                              <circle cx="2.5" cy="19.998" r="2.5" />
                              <path d="M23 19H8.5a1 1 0 000 2H23a1 1 0 000-2z" />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.ordered_list() }"
                          @click="commands.ordered_list"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--ol">
                              <path
                                d="M7.75 4.5h15a1 1 0 000-2h-15a1 1 0 000 2zm15 6.5h-15a1 1 0 100 2h15a1 1 0 000-2zm0 8.5h-15a1 1 0 000 2h15a1 1 0 000-2zM2.212 17.248a2 2 0 00-1.933 1.484.75.75 0 101.45.386.5.5 0 11.483.63.75.75 0 100 1.5.5.5 0 11-.482.635.75.75 0 10-1.445.4 2 2 0 103.589-1.648.251.251 0 010-.278 2 2 0 00-1.662-3.111zm2.038-6.5a2 2 0 00-4 0 .75.75 0 001.5 0 .5.5 0 011 0 1.031 1.031 0 01-.227.645L.414 14.029A.75.75 0 001 15.248h2.5a.75.75 0 000-1.5h-.419a.249.249 0 01-.195-.406L3.7 12.33a2.544 2.544 0 00.55-1.582zM4 5.248h-.25A.25.25 0 013.5 5V1.623A1.377 1.377 0 002.125.248H1.5a.75.75 0 000 1.5h.25A.25.25 0 012 2v3a.25.25 0 01-.25.25H1.5a.75.75 0 000 1.5H4a.75.75 0 000-1.5z"
                              />
                            </svg>
                          </div>
                        </a>

                        <a
                          class="menubar__button"
                          :class="{ 'is-active': isActive.blockquote() }"
                          @click="commands.blockquote"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--quote">
                              <path
                                d="M18.559 3.932a4.942 4.942 0 100 9.883 4.609 4.609 0 001.115-.141.25.25 0 01.276.368 6.83 6.83 0 01-5.878 3.523 1.25 1.25 0 000 2.5 9.71 9.71 0 009.428-9.95V8.873a4.947 4.947 0 00-4.941-4.941zm-12.323 0a4.942 4.942 0 000 9.883 4.6 4.6 0 001.115-.141.25.25 0 01.277.368 6.83 6.83 0 01-5.878 3.523 1.25 1.25 0 000 2.5 9.711 9.711 0 009.428-9.95V8.873a4.947 4.947 0 00-4.942-4.941z"
                              />
                            </svg>
                          </div>
                        </a>
                        <a class="menubar__button" @click="showImagePrompt(commands.image)">
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--image">
                              <circle cx="9.75" cy="6.247" r="2.25" />
                              <path
                                d="M16.916 8.71A1.027 1.027 0 0016 8.158a1.007 1.007 0 00-.892.586l-1.558 3.434a.249.249 0 01-.422.053l-.82-1.024a1 1 0 00-.813-.376 1.007 1.007 0 00-.787.426L7.59 15.71a.5.5 0 00.41.79h12a.5.5 0 00.425-.237.5.5 0 00.022-.486z"
                              />
                              <path
                                d="M22 0H5.5a2 2 0 00-2 2v16.5a2 2 0 002 2H22a2 2 0 002-2V2a2 2 0 00-2-2zm-.145 18.354a.5.5 0 01-.354.146H6a.5.5 0 01-.5-.5V2.5A.5.5 0 016 2h15.5a.5.5 0 01.5.5V18a.5.5 0 01-.145.351z"
                              />
                              <path
                                d="M19.5 22h-17a.5.5 0 01-.5-.5v-17a1 1 0 00-2 0V22a2 2 0 002 2h17.5a1 1 0 000-2z"
                              />
                            </svg>
                          </div>
                        </a>
                        <a
                          class="menubar__button"
                          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
                        >
                          <div class="icon">
                            <svg viewBox="0 0 24 24" id="icon--table">
                              <path
                                fill-rule="evenodd"
                                d="M17 17v5h2a3 3 0 003-3v-2h-5zm-2 0H9v5h6v-5zm2-2h5V9h-5v6zm-2 0V9H9v6h6zm2-8h5V5a3 3 0 00-3-3h-2v5zm-2 0V2H9v5h6zm9 9.177V19a5 5 0 01-5 5H5a5 5 0 01-5-5V5a5 5 0 015-5h14a5 5 0 015 5v2.823a.843.843 0 010 .354v7.646a.843.843 0 010 .354zM7 2H5a3 3 0 00-3 3v2h5V2zM2 9v6h5V9H2zm0 8v2a3 3 0 003 3h2v-5H2z"
                              />
                            </svg>
                          </div>
                        </a>

                        <span v-if="isActive.table()">
                          <a class="menubar__button" @click="commands.deleteTable">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--delete_table">
                                <path
                                  d="M19 14a5 5 0 110 10 5 5 0 010-10zm-2.5 5.938h5a.937.937 0 100-1.875h-5a.937.937 0 100 1.875zM12.29 17H9v5h3.674c.356.75.841 1.426 1.427 2H5a5 5 0 01-5-5V5a5 5 0 015-5h14a5 5 0 015 5v2.823a.843.843 0 010 .354V14.1a7.018 7.018 0 00-2-1.427V9h-5v3.29a6.972 6.972 0 00-2 .965V9H9v6h4.255a6.972 6.972 0 00-.965 2zM17 7h5V5a3 3 0 00-3-3h-2v5zm-2 0V2H9v5h6zM7 2H5a3 3 0 00-3 3v2h5V2zM2 9v6h5V9H2zm0 8v2a3 3 0 003 3h2v-5H2z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addColumnBefore">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_col_before">
                                <path
                                  d="M19 14a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875h-1.25a.312.312 0 01-.313-.313V16.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 101.875 0v-1.25c0-.173.14-.313.312-.313h1.25zM2 19a3 3 0 006 0V5a3 3 0 10-6 0v14zm-2 0V5a5 5 0 1110 0v14a5 5 0 01-10 0z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addColumnAfter">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_col_after">
                                <path
                                  d="M5 14a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875H6.25a.312.312 0 01-.313-.313V16.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H2.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 101.875 0v-1.25c0-.173.14-.313.312-.313H7.5zM16 19a3 3 0 006 0V5a3 3 0 00-6 0v14zm-2 0V5a5 5 0 0110 0v14a5 5 0 01-10 0z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.deleteColumn">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--delete_col">
                                <path
                                  d="M12.641 21.931a7.01 7.01 0 001.146 1.74A5 5 0 017 19V5a5 5 0 1110 0v7.29a6.972 6.972 0 00-2 .965V5a3 3 0 00-6 0v14a3 3 0 003.641 2.931zM19 14a5 5 0 110 10 5 5 0 010-10zm-2.5 5.938h5a.937.937 0 100-1.875h-5a.937.937 0 100 1.875z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addRowBefore">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_row_before">
                                <path
                                  d="M19 14a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875h-1.25a.312.312 0 01-.313-.313V16.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 101.875 0v-1.25c0-.173.14-.313.312-.313h1.25zM5 2a3 3 0 100 6h14a3 3 0 000-6H5zm0-2h14a5 5 0 010 10H5A5 5 0 115 0z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.addRowAfter">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--add_row_after">
                                <path
                                  d="M19 0a5 5 0 110 10 5 5 0 010-10zm2.5 5.938a.937.937 0 100-1.875h-1.25a.312.312 0 01-.313-.313V2.5a.937.937 0 10-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 100 1.875h1.25c.173 0 .313.14.313.312V7.5a.937.937 0 101.875 0V6.25c0-.173.14-.313.312-.313h1.25zM5 16a3 3 0 000 6h14a3 3 0 000-6H5zm0-2h14a5 5 0 010 10H5a5 5 0 010-10z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.deleteRow">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--delete_row">
                                <path
                                  d="M13.255 15a6.972 6.972 0 00-.965 2H5A5 5 0 015 7h14a5 5 0 014.671 6.787 7.01 7.01 0 00-1.74-1.146A3 3 0 0019 9H5a3 3 0 000 6h8.255zM19 14a5 5 0 110 10 5 5 0 010-10zm-2.5 5.938h5a.937.937 0 100-1.875h-5a.937.937 0 100 1.875z"
                                />
                              </svg>
                            </div>
                          </a>
                          <a class="menubar__button" @click="commands.toggleCellMerge">
                            <div class="icon">
                              <svg viewBox="0 0 24 24" id="icon--combine_cells">
                                <path
                                  d="M2 19a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3H5a3 3 0 00-3 3v14zm-2 0V5a5 5 0 015-5h14a5 5 0 015 5v14a5 5 0 01-5 5H5a5 5 0 01-5-5zm12-9a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm0 6a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1zm0-13a1 1 0 011 1v3a1 1 0 01-2 0V4a1 1 0 011-1z"
                                />
                              </svg>
                            </div>
                          </a>
                        </span>
                      </div>
                    </div>
                  </editor-menu-bar>
                  <br />
                  <editor-content
                    class="editor__content form-group"
                    :editor="formData.content"
                    style="border: 1px solid #ced4da;padding: 0.375rem 0.75rem;border-radius: 0.25rem;"
                  />
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="excerpt">
                    Excerpt
                    <span style="font-size:12px">(Maximum 255 characters)</span>
                  </label>
                  <b-form-textarea
                    type="text"
                    name="excerpt"
                    v-model="formData.excerpt"
                    id="excerpt"
                    class="form-control"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('excerpt') }"
                  />
                  <span v-show="errors.has('excerpt')" class="help is-danger">
                    {{
                    errors.first("excerpt")
                    }}
                  </span>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <p class="mt-3">Banner Image</p>
                  <progressBar
                    v-if="progress.imageUpload"
                    :max="progress.maxval"
                    :colours="progress.imagecolours.variant"
                    :percent="progress.imagePercent"
                    filerefs="file"
                  ></progressBar>
                  <div class="row col-sm-3 mt-3">
                    <b-img
                      v-if="formData.bannerImageUrl == ''"
                      class="img-thumbnail tick1"
                      :src="banimg"
                      alt="Fluid image"
                      style="height: 125px;width: 125px;"
                    />
                    <b-img
                      v-else
                      class="img-thumbnail tick1"
                      :src="formData.bannerImageUrl"
                      alt="Fluid image"
                      style="height: 125px;width: 125px;"
                    />
                    <!-- <b-img v-else :src="userImage" class="user-profile img-thumbnail tick2" /> -->
                    <label for="file" class="editoverlay">
                      <div class="editcamicon">
                        <i class="fa fa-camera imgedithover"></i>
                        <p class="changeimg-text">CHANGE IMAGE</p>
                      </div>
                    </label>
                  </div>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    class="mt-3 d-none"
                    accept="image/jpeg, image/png, image/gif, image/jpg"
                    v-validate
                    :class="{ 'is-danger': errors.has('file') }"
                    v-on:change="handleFileUpload(0)"
                    ref="file"
                  />
                  <span v-show="imgErr" class="help is-danger ml-2">{{imgErr}}</span>
                </b-form-group>
                <b-form-group class="col-sm-12 audiohit">
                  <label for="file">Audio</label>
                  <div class="dashborder mt-3">
                    <progressBar
                      v-if="progress.audioUpload"
                      :max="progress.maxval"
                      :colours="progress.audiocolours.variant"
                      :percent="progress.audioPercent"
                      filerefs="fileaudio"
                    ></progressBar>
                    <input
                      type="file"
                      name="audio"
                      id="audio"
                      accept=".mp3, .ogg"
                      class="form-control"
                      v-validate
                      :class="{ 'is-danger': errors.has('audio') }"
                      v-on:change="handleFileUpload(1)"
                      ref="fileaudio"
                    />
                    <span v-show="audioErr" class="help is-danger ml-2">{{audioErr}}</span>
                  </div>
                  <b-embed
                    class="audiocls bg-iavt bgcards mt-3"
                    type="audio"
                    v-if="formData.audioUrl != ''"
                    controls
                  >
                    <source :src="formData.audioUrl" type="audio/webm" />
                    <source :src="formData.audioUrl" type="audio/mp3" />
                  </b-embed>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="video">Video</label>
                  <div class="dashborder mt-3">
                    <progressBar
                      v-if="progress.videoUpload"
                      :max="progress.maxval"
                      :colours="progress.videocolours.variant"
                      :percent="progress.videoPercent"
                      filerefs="filevideo"
                    ></progressBar>
                    <input
                      type="file"
                      name="video"
                      id="video"
                      class="form-control"
                      accept=".mp4"
                      v-validate
                      :class="{ 'is-danger': errors.has('video') }"
                      v-on:change="handleFileUpload(2)"
                      ref="filevideo"
                    />
                    <span v-show="videoErr" class="help is-danger ml-2">{{videoErr}}</span>
                  </div>
                  <b-embed
                    type="video"
                    v-if="formData.videoUrl != ''"
                    controls
                    class="audiocls bg-iavt bgcards mt-3"
                  >
                    <source :src="formData.videoUrl" type="video/webm" />
                    <source :src="formData.videoUrl" type="video/mp4" />
                  </b-embed>
                </b-form-group>
                <b-form-group class="col-sm-12">
                  <label for="pdf">PDF</label>
                  <div class="dashborder mt-3">
                    <progressBar
                      v-if="progress.pdfUpload"
                      :max="progress.maxval"
                      :colours="progress.pdfcolours.variant"
                      :percent="progress.pdfPercent"
                      filerefs="filepdf"
                    ></progressBar>
                    <input
                      type="file"
                      name="pdf"
                      id="pdf"
                      accept=".pdf, .doc, .docx, .txt"
                      class="form-control"
                      v-validate
                      :class="{ 'is-danger': errors.has('pdf') }"
                      v-on:change="handleFileUpload(3)"
                      ref="filepdf"
                    />
                    <span v-show="pdfErr" class="help is-danger ml-2">{{pdfErr}}</span>
                  </div>
                  <button type="button" class="btn btn-warning mt-3" v-if="formData.pdfUrl != ''">
                    <a :href="formData.pdfUrl" class="clr-red">
                      <i class="fas fa-file-pdf">
                        <span class="ml-2">Download</span>
                      </i>
                    </a>
                  </button>
                  <p v-else class="mt-3">No pdf file exist</p>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-row>
                  <b-form-group label="Parent" label-for="parentId" class="col-sm-12">
                    <b-form-select
                      v-model="formData.parentId"
                      v-validate="'required'"
                      name="parentId"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('parentId') }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="0">None</option>
                      <option
                        v-for="(eve, index) in allMedia.row"
                        :key="index"
                        :value="eve.ID"
                      >{{ eve.title }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('parentId')"
                      class="help is-danger"
                    >{{ errors.first('parentId') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <label class="col-sm-12 form-group">Show Child</label>
                  <b-col sm="6" class="radio">
                    <b-form-radio
                      type="radio"
                      v-model="formData.showChild"
                      name="showChild"
                      v-validate="'required|included:1,0'"
                      value="1"
                      class="checkx"
                    >
                      <span class="check-paddleft">Yes</span>
                    </b-form-radio>
                  </b-col>
                  <b-col sm="6" class="radio">
                    <b-form-radio
                      type="radio"
                      v-model="formData.showChild"
                      name="showChild"
                      value="0"
                      class="checkx"
                    >
                      <span class="check-paddleft">No</span>
                    </b-form-radio>
                  </b-col>
                  <b-col>
                    <span
                      v-show="errors.has('showChild')"
                      class="help is-danger"
                    >{{ errors.first('showChild') }}</span>
                  </b-col>
                  <br />
                </b-row>
                <b-row>
                  <b-form-group label="Status" label-for="status" class="col-sm-12">
                    <b-form-select
                      v-model="formData.status"
                      v-validate="'required'"
                      name="status"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('status') }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option value="Published">Published</option>
                      <option value="Private">Private</option>
                      <option value="Draft">Draft</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('status')"
                      class="help is-danger"
                    >{{ errors.first('status') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Language" label-for="language" class="col-sm-12">
                    <b-form-select
                      v-model="formData.language"
                      v-validate="'required'"
                      name="language"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('language') }"
                    >
                      <option class="disable" disabled value>Select</option>
                      <option
                        v-for="(lang, index) in existinglang.rows"
                        :key="index"
                        :value="lang.langId"
                      >{{ lang.OriginalLangtext }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('language')"
                      class="help is-danger"
                    >{{ errors.first('language') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group label="Classification" label-for="Classification" class="col-sm-12">
                    <b-form-select
                      v-model="formData.mediaClassification"
                      v-validate="'required'"
                      name="mediaClassification"
                      class="txtbox-design"
                      :class="{'input': true, 'is-danger': errors.has('mediaClassification') }"
                    >
                      <option value="0">None</option>
                      <option
                        v-for="(med, index) in mediaType"
                        :key="index"
                        :value="med.mediaClassifyId"
                      >{{ med.mediaClassifyName }}</option>
                    </b-form-select>
                    <span
                      v-show="errors.has('mediaClassification')"
                      class="help is-danger"
                    >{{ errors.first('mediaClassification') }}</span>
                  </b-form-group>
                </b-row>
              </b-col>
            </b-row>
            <div class="row"></div>
            <b-form-group class="col-sm-12 text-right">
              <router-link to="/viewGeneralMedia" v-if="formData.mediaClassification==1">
                <button class="btn btn-warning">Cancel</button>
              </router-link>
              <router-link to="/viewCourseMedia" v-else>
                <button class="btn btn-warning">Cancel</button>
              </router-link>
              <b-button
                type="submit"
                class="btn btn-warning"
                v-if="$route.params.view !== 'view'"
              >Submit</b-button>
            </b-form-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-change"
      ref="changeModal"
      hide-header-close
      no-close-on-backdrop
      ok-only
      ok-title="Ok"
      @ok="handleOk"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ changeMsg }}</p>
    </b-modal>
  </b-container>
</template>
<script>
import axios from "axios";
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import progressBar from "../../admin/progressBar.vue";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Validator } from "vee-validate";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          },
          numeric: function() {
            return "Only accept digits";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      banimg: require("@/assets/images/banner.jpg"),
      titleExists: false,
      formData: {
        content: null,
        title: "",
        excerpt: "",
        parentId: "",
        showChild: "",
        status: "",
        expire: "",
        language: "",
        bannerImageUrl: "",
        mediaClassification: "",
        pdfUrl: "",
        videoUrl: "",
        audioUrl: ""
      },
      videoclickUrl: "",
      bannerImageUrl: "",
      file: "",
      video: "",
      audio: "",
      pdf: "",
      changeMsg: "",
      extension: "",
      imgErr: false,
      audioErr: false,
      videoErr: false,
      pdfErr: false,
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        },
        audioPercent: 0,
        audioUpload: false,
        audiocolours: {
          variant: "warning"
        },
        videoPercent: 0,
        videoUpload: false,
        videocolours: {
          variant: "warning"
        },
        pdfPercent: 0,
        pdfUpload: false,
        pdfcolours: {
          variant: "warning"
        },
        maxval: 100
      }
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    EditorContent,
    EditorMenuBar,
    progressBar
  },
  computed: {
    ...mapState(["existinglang", "allMedia", "allQuiz", "mediaType"]),
    commonIndex() {
      if (this.allMedia.row !== null && this.allMedia.row.length !== 0) {
        return this.allMedia.row.findIndex(
          x => x.ID === parseInt(this.$route.params.id)
        );
      } else {
        return -1;
      }
    }
  },
  methods: {
    titleCheck() {
      let pa = this.allMedia.row.findIndex(
        x => x.title === this.formData.title
      );
      if (pa !== -1) {
        this.titleExists = true;
      } else {
        this.titleExists = false;
      }
    },
    ...mapActions(["editMediaById"]),
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    editMedia() {
      this.$validator.validateAll().then(valid => {
        if (valid && !this.titleExists) {
          const payload = {
            index: this.commonIndex,
            ID: this.allMedia.row[this.commonIndex].ID,
            content: this.formData.content.getHTML(),
            title: this.formData.title,
            excerpt: this.formData.excerpt.substring(0, 254),
            parentId: this.formData.parentId,
            showChild: this.formData.showChild,
            status: this.formData.status,
            expire: this.formData.expire,
            language: this.formData.language,
            mediaClassification: this.formData.mediaClassification,
            bannerImageUrl:
              this.formData.bannerImageUrl === ""
                ? this.allMedia.row[this.commonIndex].bannerImageUrl
                : this.formData.bannerImageUrl,
            pdfUrl:
              this.formData.pdfUrl === ""
                ? this.allMedia.row[this.commonIndex].pdfUrl
                : this.formData.pdfUrl,
            videoUrl:
              this.formData.videoUrl === ""
                ? this.allMedia.row[this.commonIndex].videoUrl
                : this.formData.videoUrl,
            audioUrl:
              this.formData.audioUrl === ""
                ? this.allMedia.row[this.commonIndex].audioUrl
                : this.formData.audioUrl,
            addedBy: localStorage.getItem("userId"),
            editedBy: localStorage.getItem("userId")
          };
          this.editMediaById(payload);
          this.changeMsg = "Edited successfully";
          this.$bvModal.show("modal-change");
        }
      });
    },
    handleFileUpload(i) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        var self = this;
        if (i === 0) {
          this.imgErr = false;
          this.file = this.$refs.file.files[0];
          let formData = new FormData();
          formData.append("file", this.file);
          this.progress.imagecolours.variant = "warning";
          this.progress.imageUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.imagePercent = 5;
                setTimeout(function() {
                  self.progress.imagePercent = 50;
                  self.progress.imagecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.imagePercent = 100;
                self.progress.imagecolours.variant = "success";
                self.formData.bannerImageUrl = res.data.file;
                setTimeout(function() {
                  self.progress.imageUpload = false;
                  self.progress.imagePercent = 0;
                  self.progress.imagecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.imgErr = "Check your internet connection";
              self.progress.imageUpload = false;
              console.log("FAILURE!!");
            });
        } else if (i === 1) {
          this.audioErr = false;
          this.audio = this.$refs.fileaudio.files[0];
          let formData = new FormData();
          formData.append("file", this.audio);
          this.progress.audiocolours.variant = "warning";
          this.progress.audioUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/audio", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.audioPercent = 5;
                setTimeout(function() {
                  self.progress.audioPercent = 50;
                  self.progress.audiocolours.variant = "info";
                }, 1000);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.audioPercent = 100;
                self.progress.audiocolours.variant = "success";
                self.formData.audioUrl = res.data.file;
                setTimeout(function() {
                  self.progress.audioUpload = false;
                  self.progress.audioPercent = 0;
                  self.progress.audiocolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.audioErr = "Check your internet connection";
              self.progress.audioUpload = false;
              console.log("FAILURE!!");
            });
        } else if (i === 2) {
          this.videoErr = false;
          this.video = this.$refs.filevideo.files[0];
          let formData = new FormData();
          formData.append("file", this.video);
          this.progress.videocolours.variant = "warning";
          this.progress.videoUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/video", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.videoPercent = 5;
                setTimeout(function() {
                  self.progress.videoPercent = 50;
                  self.progress.videocolours.variant = "info";
                }, 2000);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.videoPercent = 100;
                self.progress.videocolours.variant = "success";
                self.formData.videoUrl = res.data.file;
                setTimeout(function() {
                  self.progress.videoUpload = false;
                  self.progress.videoPercent = 0;
                  self.progress.videocolours.variant = "light";
                }, 3000);
                console.log(self.formData.video);
              }
            })
            .catch(function() {
              self.videoErr = "Check your internet connection";
              self.progress.videoUpload = false;
              console.log("FAILURE!!");
            });
        } else if (i === 3) {
          this.pdfErr = false;
          this.pdf = this.$refs.filepdf.files[0];
          let formData = new FormData();
          formData.append("file", this.pdf);
          this.progress.pdfcolours.variant = "warning";
          this.progress.pdfUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/pdf", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.pdfPercent = 5;
                setTimeout(function() {
                  self.progress.pdfPercent = 50;
                  self.progress.pdfcolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.pdfPercent = 100;
                self.progress.pdfcolours.variant = "success";
                self.formData.pdfUrl = res.data.file;
                setTimeout(function() {
                  self.progress.pdfUpload = false;
                  self.progress.pdfPercent = 0;
                  self.progress.pdfcolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.pdfErr = "Check your internet connection";
              self.progress.pdfUpload = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.formData.mediaClassification === 1) {
        this.$router.push({ path: "/ViewGeneralMedia/" });
      } else {
        this.$router.push({ path: "/ViewCourseMedia/" });
      }
    }
  },
  created() {
    this.formData.title = this.allMedia.row[this.commonIndex].title;
    this.formData.excerpt = this.allMedia.row[this.commonIndex].excerpt;
    this.formData.parentId = this.allMedia.row[this.commonIndex].parentId;
    this.formData.showChild = this.allMedia.row[this.commonIndex].showChild;
    this.formData.status = this.allMedia.row[this.commonIndex].status;
    this.formData.expire = this.allMedia.row[this.commonIndex].expire;
    this.formData.language = this.allMedia.row[this.commonIndex].language;
    this.formData.bannerImageUrl =
      this.allMedia.row[this.commonIndex].bannerImageUrl !== null
        ? this.allMedia.row[this.commonIndex].bannerImageUrl
        : "";
    this.formData.pdfUrl =
      this.allMedia.row[this.commonIndex].pdfUrl !== null
        ? this.allMedia.row[this.commonIndex].pdfUrl
        : "";
    this.formData.videoUrl =
      this.allMedia.row[this.commonIndex].videoUrl !== null
        ? this.allMedia.row[this.commonIndex].videoUrl
        : "";
    this.formData.audioUrl =
      this.allMedia.row[this.commonIndex].audioUrl !== ""
        ? this.allMedia.row[this.commonIndex].audioUrl
        : "";
    this.formData.mediaClassification = this.allMedia.row[
      this.commonIndex
    ].mediaClassification;
  },
  mounted() {
    this.formData.content = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow()
      ],
      content: this.allMedia.row[this.commonIndex].content
    });
  },
  beforeDestroy() {
    this.formData.content.destroy();
  }
};
</script>
<style>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
}
.ProseMirror-focused {
  outline: none;
}
</style>
